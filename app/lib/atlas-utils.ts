import {
  applications,
  eras,
  people,
  regions,
  relationships,
  topics,
  works,
  type AtlasTag,
  type Difficulty,
  type RelationshipType,
  type Topic,
} from '@/app/data/atlas';

export type AtlasRecordKind = 'topic' | 'person' | 'work' | 'era' | 'application';

export type AtlasSearchResult = {
  id: string;
  kind: AtlasRecordKind;
  title: string;
  subtitle: string;
  haystack: string;
};

export type AtlasFilters = {
  fieldId: string;
  difficulty: Difficulty | 'all';
  eraId: string;
  tag: AtlasTag | 'all';
  relationshipTypes: RelationshipType[];
};

export type ValidationIssue = {
  severity: 'error' | 'warning';
  message: string;
};

export const relationshipLabels: Record<RelationshipType, string> = {
  prerequisite: 'Prerequisite',
  'historically-influenced': 'Historical',
  'applied-in': 'Applied in',
  'generalized-by': 'Generalized by',
  'example-of': 'Example of',
  'related-to': 'Related',
};

const topicById = new Map(topics.map((topic) => [topic.id, topic]));
const regionById = new Map(regions.map((region) => [region.id, region]));
const eraById = new Map(eras.map((era) => [era.id, era]));
const personById = new Map(people.map((person) => [person.id, person]));
const workById = new Map(works.map((work) => [work.id, work]));

export const getTopic = (id: string) => topicById.get(id);
export const getRegion = (id: string) => regionById.get(id);
export const getEra = (id: string) => eraById.get(id);
export const getPerson = (id: string) => personById.get(id);
export const getWork = (id: string) => workById.get(id);

const normalize = (value: string) => value.toLowerCase().trim();

const records: AtlasSearchResult[] = [
    ...topics.map((topic) => ({
      id: topic.id,
      kind: 'topic' as const,
      title: topic.name,
      subtitle: getRegion(topic.fieldId)?.name ?? 'Topic',
      haystack: [
        topic.name,
        topic.overview,
        topic.keyIdeas.join(' '),
        topic.tags.join(' '),
        topic.difficulty,
      ].join(' '),
    })),
    ...people.map((person) => ({
      id: person.id,
      kind: 'person' as const,
      title: person.name,
      subtitle: `${person.lifespan} - ${person.region}`,
      haystack: [person.name, person.region, person.majorContributions.join(' ')].join(' '),
    })),
    ...works.map((work) => ({
      id: work.id,
      kind: 'work' as const,
      title: work.title,
      subtitle: `${work.year} - ${work.authors.join(', ')}`,
      haystack: [work.title, work.authors.join(' '), work.whyItMattered].join(' '),
    })),
    ...eras.map((era) => ({
      id: era.id,
      kind: 'era' as const,
      title: era.name,
      subtitle: era.span,
      haystack: [era.name, era.summary, era.highlights.join(' ')].join(' '),
    })),
    ...applications.map((app) => ({
      id: app.id,
      kind: 'application' as const,
      title: app.name,
      subtitle: 'Application domain',
      haystack: [app.name, app.summary].join(' '),
    })),
  ];

const searchIndex = records.map((record) => ({
  record,
  title: normalize(record.title),
  haystack: normalize(record.haystack),
}));
const topicSearchText = new Map(topics.map((topic) => [topic.id, normalize([
  topic.name, topic.overview, topic.keyIdeas.join(' '), topic.tags.join(' '),
  getRegion(topic.fieldId)?.name ?? '',
].join(' '))]));

export function searchAtlas(query: string): AtlasSearchResult[] {
  const q = normalize(query);

  if (!q) {
    return records.slice(0, 12);
  }

  return searchIndex
    .map(({ record, title, haystack }) => {
      const score =
        (title === q ? 40 : 0) +
        (title.startsWith(q) ? 18 : 0) +
        (title.includes(q) ? 10 : 0) +
        (haystack.includes(q) ? 5 : 0);

      return { record, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.record.title.localeCompare(b.record.title))
    .slice(0, 40)
    .map(({ record }) => record);
}

export function filterTopics(filters: AtlasFilters, query: string): Topic[] {
  const q = normalize(query);

  return topics.filter((topic) => {
    const matchesQuery =
      !q ||
      topicSearchText.get(topic.id)!.includes(q);

    return (
      matchesQuery &&
      (filters.fieldId === 'all' || topic.fieldId === filters.fieldId) &&
      (filters.difficulty === 'all' || topic.difficulty === filters.difficulty) &&
      (filters.eraId === 'all' || topic.eraId === filters.eraId) &&
      (filters.tag === 'all' || topic.tags.includes(filters.tag))
    );
  });
}

export function findLearningPath(goalTopicId: string): string[] {
  const topic = getTopic(goalTopicId);
  if (!topic) {
    return [];
  }

  const edges = new Map<string, string[]>();
  for (const rel of relationships) {
    if (rel.type !== 'prerequisite') {
      continue;
    }
    edges.set(rel.targetId, [...(edges.get(rel.targetId) ?? []), rel.sourceId]);
  }

  const visited = new Set<string>();
  const result: string[] = [];

  const visit = (id: string) => {
    if (visited.has(id)) {
      return;
    }
    visited.add(id);
    for (const previous of edges.get(id) ?? []) {
      visit(previous);
    }
    result.push(id);
  };

  for (const step of topic.learningPath) {
    visit(step);
  }
  visit(goalTopicId);

  return result.filter((id) => Boolean(getTopic(id)));
}

export function relatedEdgesFor(topicId: string, enabled: RelationshipType[] = []){
  const allowed = new Set(enabled);
  return relationships.filter(
    (rel) =>
      (allowed.size === 0 || allowed.has(rel.type)) &&
      (rel.sourceId === topicId || rel.targetId === topicId),
  );
}

export function validateAtlasData(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const ids = new Set<string>();
  const fieldIds = new Set(regions.map((region) => region.id));
  const eraIds = new Set(eras.map((era) => era.id));
  const topicIds = new Set(topics.map((topic) => topic.id));
  const personIds = new Set(people.map((person) => person.id));
  const workIds = new Set(works.map((work) => work.id));
  const applicationIds = new Set(applications.map((app) => app.id));

  for (const record of [...topics, ...regions, ...people, ...works, ...eras, ...applications]) {
    if (ids.has(record.id)) {
      issues.push({ severity: 'error', message: `Duplicate id: ${record.id}` });
    }
    ids.add(record.id);
  }

  for (const topic of topics) {
    if (!fieldIds.has(topic.fieldId)) {
      issues.push({ severity: 'error', message: `${topic.id} references missing field ${topic.fieldId}` });
    }
    if (!eraIds.has(topic.eraId)) {
      issues.push({ severity: 'error', message: `${topic.id} references missing era ${topic.eraId}` });
    }
    for (const prereq of topic.prerequisites) {
      if (!topicIds.has(prereq)) {
        issues.push({ severity: 'error', message: `${topic.id} has missing prerequisite ${prereq}` });
      }
    }
    for (const related of topic.related) {
      if (!topicIds.has(related)) {
        issues.push({ severity: 'warning', message: `${topic.id} has missing related topic ${related}` });
      }
    }
    for (const personId of topic.contributorIds) {
      if (!personIds.has(personId)) {
        issues.push({ severity: 'warning', message: `${topic.id} references missing person ${personId}` });
      }
    }
    for (const workId of topic.workIds) {
      if (!workIds.has(workId)) {
        issues.push({ severity: 'warning', message: `${topic.id} references missing work ${workId}` });
      }
    }
  }

  for (const person of people) {
    for (const fieldId of person.fieldIds) {
      if (!fieldIds.has(fieldId)) {
        issues.push({ severity: 'error', message: `${person.id} references missing field ${fieldId}` });
      }
    }
    for (const topicId of person.associatedTopicIds) {
      if (!topicIds.has(topicId)) {
        issues.push({ severity: 'warning', message: `${person.id} references missing topic ${topicId}` });
      }
    }
  }

  for (const work of works) {
    if (!fieldIds.has(work.fieldId)) {
      issues.push({ severity: 'error', message: `${work.id} references missing field ${work.fieldId}` });
    }
    for (const topicId of work.associatedTopicIds) {
      if (!topicIds.has(topicId)) {
        issues.push({ severity: 'warning', message: `${work.id} references missing topic ${topicId}` });
      }
    }
  }

  for (const application of applications) {
    if (!applicationIds.has(application.id)) {
      issues.push({ severity: 'error', message: `Application id disappeared: ${application.id}` });
    }
    for (const topicId of application.topicIds) {
      if (!topicIds.has(topicId)) {
        issues.push({ severity: 'warning', message: `${application.id} references missing topic ${topicId}` });
      }
    }
  }

  for (const rel of relationships) {
    if (!topicIds.has(rel.sourceId)) {
      issues.push({ severity: 'error', message: `${rel.id} has missing source ${rel.sourceId}` });
    }
    if (!topicIds.has(rel.targetId)) {
      issues.push({ severity: 'error', message: `${rel.id} has missing target ${rel.targetId}` });
    }
  }

  if (topics.length < 250) {
    issues.push({ severity: 'error', message: `Expected at least 250 topics, found ${topics.length}` });
  }
  if (regions.length < 40) {
    issues.push({ severity: 'error', message: `Expected at least 40 regions, found ${regions.length}` });
  }
  if (people.length < 100) {
    issues.push({ severity: 'error', message: `Expected at least 100 people, found ${people.length}` });
  }
  if (works.length < 75) {
    issues.push({ severity: 'error', message: `Expected at least 75 works, found ${works.length}` });
  }
  if (relationships.length < 150) {
    issues.push({
      severity: 'error',
      message: `Expected at least 150 relationships, found ${relationships.length}`,
    });
  }

  return issues;
}
