'use client';

import { ArrowLeft, ArrowUpRight, BookOpen, Bookmark, ChevronRight, Clock3, Compass, Grid2X2, Layers3, Menu, Network, Pause, Play, RotateCcw, Route, Search, Shuffle, SlidersHorizontal, Users, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react';
import MathWorlds, { type WorldCommands, type WorldSelection } from '@/app/components/MathWorlds';
import { dimensions, dimensionForField } from '@/app/data/dimensions';
import { applications, atlasStats, eras, people, regions, relationships, topics, works, type AtlasMode, type AtlasTag, type Difficulty, type RelationshipType, type Topic } from '@/app/data/atlas';
import { filterTopics, findLearningPath, getEra, getPerson, getRegion, getTopic, getWork, relationshipLabels, relatedEdgesFor, searchAtlas, validateAtlasData, type AtlasFilters, type AtlasRecordKind } from '@/app/lib/atlas-utils';

type Selection = { kind: AtlasRecordKind | 'region'; id: string };
type WebMCPDocument = Document & { modelContext?: { registerTool: (tool: { name: string; description: string; inputSchema: object; annotations?: { readOnlyHint?: boolean }; execute: (input: unknown) => unknown }, options?: { signal?: AbortSignal }) => void | Promise<void> } };
const validation = validateAtlasData();
const difficulties = ['all', 'beginner', 'intermediate', 'advanced', 'graduate', 'research'];
const tags = ['all', 'pure', 'applied', 'computational', 'historical', 'foundational'];
const relationshipTypes = Object.keys(relationshipLabels) as RelationshipType[];
function shortKind(kind: Selection['kind']) { return kind === 'application' ? 'app' : kind; }
function uniq<T>(values: T[]) { return Array.from(new Set(values)); }

const emptyBookmarks: string[] = [];
let bookmarkCache = emptyBookmarks;
let bookmarkRaw: string | null | undefined;
function readBookmarks() {
  try {
    const raw = localStorage.getItem('math-atlas-bookmarks');
    if (raw !== bookmarkRaw) {
      const stored: unknown = JSON.parse(raw ?? '[]');
      bookmarkCache = Array.isArray(stored) ? stored.filter((id): id is string => typeof id === 'string' && !!getTopic(id)) : [];
      bookmarkRaw = raw;
    }
  } catch { /* Storage is optional. */ }
  return bookmarkCache;
}
function subscribeBookmarks(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('atlas-bookmarks', callback);
  return () => { window.removeEventListener('storage', callback); window.removeEventListener('atlas-bookmarks', callback); };
}
function useLocalBookmarks() {
  const bookmarks = useSyncExternalStore(subscribeBookmarks, readBookmarks, () => emptyBookmarks);
  const toggleBookmark = useCallback((id: string) => {
    const current = readBookmarks();
    const next = current.includes(id) ? current.filter(item => item !== id) : [...current, id];
    bookmarkCache = next;
    try { bookmarkRaw = JSON.stringify(next); localStorage.setItem('math-atlas-bookmarks', bookmarkRaw); } catch { /* Keep the in-memory list. */ }
    window.dispatchEvent(new Event('atlas-bookmarks'));
  }, []);
  return { bookmarks, toggleBookmark };
}

function IconButton({ children, onClick, title, active }: { children: React.ReactNode; onClick: () => void; title: string; active?: boolean }) {
  return <button type="button" className={`icon-button ${active ? 'is-active' : ''}`} aria-label={title} aria-pressed={active} title={title} onClick={onClick}>{children}</button>;
}
function Select({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (value: string) => void }) {
  return <label className="filter-label">{label}<select value={value} onChange={event => onChange(event.target.value)}>{options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>;
}

export default function MathAtlasApp() {
  const [dimensionId, setDimensionId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<AtlasMode>('topics');
  const [selection, setSelection] = useState<Selection>({ kind: 'topic', id: 'calculus:derivatives' });
  const [history, setHistory] = useState<Selection[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [goalTopicId, setGoalTopicId] = useState('cryptography:zero-knowledge-proofs');
  const [spread, setSpread] = useState(0);
  const [rotating, setRotating] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const [filters, setFilters] = useState<AtlasFilters>({ fieldId: 'all', difficulty: 'all', eraId: 'all', tag: 'all', relationshipTypes: ['prerequisite', 'related-to', 'applied-in'] });
  const commands = useRef<WorldCommands | null>(null);
  const { bookmarks, toggleBookmark } = useLocalBookmarks();
  const dimension = dimensions.find(d => d.id === dimensionId);
  const currentField = getRegion(filters.fieldId);
  const learningPath = useMemo(() => findLearningPath(goalTopicId), [goalTopicId]);
  const pathSet = useMemo(() => new Set(learningPath), [learningPath]);
  const visibleTopics = useMemo(() => filterTopics(filters, query).filter(t => !dimension || dimension.fields.includes(t.fieldId)), [filters, query, dimension]);
  const visibleIds = useMemo(() => new Set(visibleTopics.map(t => t.id)), [visibleTopics]);
  const activeRelations = useMemo(() => relationships.filter(r => filters.relationshipTypes.includes(r.type) && visibleIds.has(r.sourceId) && visibleIds.has(r.targetId)), [filters.relationshipTypes, visibleIds]);
  const results = useMemo(() => searchAtlas(query), [query]);

  const openDimension = useCallback((id: string | null) => {
    setDimensionId(id); setSpread(0); setQuery(''); setDetailsOpen(false); setExplorerOpen(false); setMode('topics');
    setFilters(current => ({ ...current, fieldId: 'all' }));
  }, []);

  const selectRecord = useCallback((next: Selection) => {
    setHistory(current => [selection, ...current.filter(item => item.id !== selection.id)].slice(0, 8));
    setSelection(next); setDetailsOpen(true); setExplorerOpen(false);
    const fieldId = next.kind === 'topic' ? getTopic(next.id)?.fieldId : next.kind === 'region' ? next.id : undefined;
    if (fieldId) {
      setDimensionId(dimensionForField(fieldId)?.id ?? null);
      setFilters(current => ({ ...current, fieldId }));
      setSpread(next.kind === 'topic' ? 1 : 0);
      setQuery('');
    }
  }, [selection]);

  const onWorldSelect = useCallback((next: WorldSelection) => {
    if (next.kind === 'dimension') {
      if (next.id === dimensionId) setSpread(1);
      else openDimension(next.id);
    } else selectRecord({ kind: next.kind, id: next.id });
  }, [dimensionId, openDimension, selectRecord]);

  const randomTopic = () => {
    const pool = visibleTopics.length ? visibleTopics : topics;
    selectRecord({ kind: 'topic', id: pool[Math.floor(Math.random() * pool.length)].id });
  };

  useEffect(() => {
    const context = (document as WebMCPDocument).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const parse = (input: unknown) => {
      const id = (input as { topicId?: unknown })?.topicId;
      if (typeof id !== 'string' || !getTopic(id)) throw new Error('Unknown topicId.');
      return id;
    };
    const register = (tool: Parameters<typeof context.registerTool>[0]) => {
      void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => {});
    };
    register({ name: 'read_math_atlas_summary', description: 'Read the selected dimension, topic and dataset counts.', inputSchema: { type: 'object', properties: {} }, annotations: { readOnlyHint: true }, execute: () => ({ stats: atlasStats, selection, dimensionId, mode, visibleTopics: visibleTopics.length }) });
    const inputSchema = { type: 'object', properties: { topicId: { type: 'string' } }, required: ['topicId'] };
    register({ name: 'select_math_atlas_topic', description: 'Open a topic and its mathematical 3D dimension.', inputSchema, execute: input => { const id = parse(input); selectRecord({ kind: 'topic', id }); return { selected: id }; } });
    register({ name: 'bookmark_math_atlas_topic', description: 'Toggle a local topic bookmark.', inputSchema, execute: input => { const id = parse(input); toggleBookmark(id); return { topicId: id, toggled: true }; } });
    return () => lifecycle.abort();
  }, [selection, dimensionId, mode, visibleTopics.length, selectRecord, toggleBookmark]);

  const modeItems = [{ id: 'topics' as const, name: 'Dimensions', icon: <Grid2X2 size={17} /> }, { id: 'history' as const, name: 'History', icon: <Clock3 size={17} /> }, { id: 'people' as const, name: 'People', icon: <Users size={17} /> }, { id: 'works' as const, name: 'Works', icon: <BookOpen size={17} /> }];
  const listRecords = mode === 'people' ? people.map(p => ({ id: p.id, kind: 'person' as const, title: p.name, subtitle: p.lifespan }))
    : mode === 'works' ? works.map(w => ({ id: w.id, kind: 'work' as const, title: w.title, subtitle: String(w.year) }))
    : [];

  return <main className={`math-atlas ${detailsOpen ? 'has-details' : ''}`}>
    <header className="atlas-header">
      <button className="brand" onClick={() => openDimension(null)} aria-label="Math Atlas home">
        <span className="brand-mark"><Compass size={24} strokeWidth={1.4} /></span>
        <span><span className="eyebrow">INTERACTIVE MATHEMATICS</span><strong>Math Atlas <sup>3D</sup></strong></span>
      </button>
      <div className="header-search">
        <Search size={17} /><input aria-label="Search the atlas" placeholder="Find a topic, person, or work" value={query} onChange={event => setQuery(event.target.value)} />
        {query && <button aria-label="Clear search" onClick={() => setQuery('')}><X size={15} /></button>}
        {query && <div className="search-results">{results.length ? results.map(result => <button key={result.id} onClick={() => selectRecord({ kind: result.kind, id: result.id })}><span>{result.title}</span><small>{result.kind} · {result.subtitle}</small></button>) : <p>No matching entries.</p>}</div>}
      </div>
      <div className="mobile-explorer-toggle"><IconButton title={explorerOpen ? 'Close explorer' : 'Open explorer'} onClick={() => setExplorerOpen(!explorerOpen)}><Menu size={20} /></IconButton></div>
    </header>

    <aside className={`dimension-explorer ${explorerOpen ? 'is-open' : ''}`}>
      <div className="explorer-title"><strong>Explorer</strong><span>{regions.length} fields</span></div>
      <div className="mode-tabs">{modeItems.map(item => <button key={item.id} title={item.name} aria-label={item.name} aria-pressed={mode === item.id} onClick={() => setMode(item.id)}>{item.icon}</button>)}</div>
      <div className="explorer-scroll">
        {mode === 'topics' ? <>
          <button className={`dimension-row collection-row ${!dimension ? 'selected' : ''}`} onClick={() => openDimension(null)}><Grid2X2 size={15} /><span>All dimensions</span><small>10</small></button>
          <nav aria-label="Mathematical dimensions">
            {dimensions.map((d, index) => <div key={d.id}>
              <button className={`dimension-row ${dimensionId === d.id ? 'selected' : ''}`} style={{ '--dimension-color': d.color } as CSSProperties} onClick={() => openDimension(d.id)}>
                <i /><span>{d.name}</span><small>{String(index + 1).padStart(2, '0')}</small>
              </button>
              {dimensionId === d.id && <div className="field-list">{d.fields.map(id => <button className={filters.fieldId === id ? 'selected' : ''} key={id} onClick={() => selectRecord({ kind: 'region', id })}>{getRegion(id)?.name}<ChevronRight size={13} /></button>)}</div>}
            </div>)}
          </nav>
          {dimension && <div className="topic-list"><div className="section-label">Topics <span>{visibleTopics.length}</span></div>{visibleTopics.map(topic => <button key={topic.id} onClick={() => selectRecord({ kind: 'topic', id: topic.id })}>{topic.name}<ArrowUpRight size={12} /></button>)}{!visibleTopics.length && <p className="empty-state">No topics match these filters.</p>}</div>}
        </> : mode === 'history' ? <div className="era-list">{eras.map(era => <button key={era.id} onClick={() => { setFilters(current => ({ ...current, eraId: era.id })); selectRecord({ kind: 'era', id: era.id }); }}><small>{era.span}</small><span>{era.name}</span></button>)}</div>
        : <div className="record-list">{listRecords.map(record => <button key={record.id} onClick={() => selectRecord({ kind: record.kind, id: record.id })}><span>{record.title}</span><small>{record.subtitle}</small></button>)}</div>}

        <details className="explorer-section">
          <summary><SlidersHorizontal size={15} />Filters</summary>
          <div className="filter-grid">
            <Select label="Difficulty" value={filters.difficulty} options={difficulties.map(d => ({ value: d, label: d === 'all' ? 'All levels' : d }))} onChange={value => setFilters(f => ({ ...f, difficulty: value as Difficulty | 'all' }))} />
            <Select label="Era" value={filters.eraId} options={[{ value: 'all', label: 'All eras' }, ...eras.map(e => ({ value: e.id, label: e.name }))]} onChange={eraId => setFilters(f => ({ ...f, eraId }))} />
            <Select label="Tag" value={filters.tag} options={tags.map(t => ({ value: t, label: t === 'all' ? 'All tags' : t }))} onChange={tag => setFilters(f => ({ ...f, tag: tag as AtlasTag | 'all' }))} />
          </div>
          <button className="text-button" onClick={() => { setQuery(''); setFilters(f => ({ ...f, difficulty: 'all', eraId: 'all', tag: 'all' })); }}>Clear filters</button>
        </details>
        <details className="explorer-section">
          <summary><Network size={15} />Relationships</summary>
          {relationshipTypes.map(type => <label className="check-row" key={type}><input type="checkbox" checked={filters.relationshipTypes.includes(type)} onChange={() => setFilters(f => ({ ...f, relationshipTypes: f.relationshipTypes.includes(type) ? f.relationshipTypes.filter(t => t !== type) : [...f.relationshipTypes, type] }))} />{relationshipLabels[type]}</label>)}
        </details>
        <details className="explorer-section">
          <summary><Route size={15} />Learning path</summary>
          <Select label="Destination" value={goalTopicId} options={topics.map(t => ({ value: t.id, label: t.name }))} onChange={id => { setGoalTopicId(id); selectRecord({ kind: 'topic', id }); }} />
          <ol className="path-list">{learningPath.map(id => <li key={id}><button onClick={() => selectRecord({ kind: 'topic', id })}>{getTopic(id)?.name}</button></li>)}</ol>
        </details>
        <details className="explorer-section">
          <summary><Bookmark size={15} />Bookmarks <span>{bookmarks.length}</span></summary>
          {bookmarks.length ? bookmarks.map(id => <button className="saved-topic" key={id} onClick={() => selectRecord({ kind: 'topic', id })}>{getTopic(id)?.name}</button>) : <p className="empty-state">No bookmarks yet.</p>}
        </details>
      </div>
      <div className="explorer-footer"><span className="status-dot" />{visibleTopics.length} topics in view</div>
    </aside>

    <div className="scene-heading">
      {dimension ? <><button className="back-link" onClick={() => currentField ? openDimension(dimension.id) : openDimension(null)}><ArrowLeft size={14} />{currentField ? dimension.name : 'All dimensions'}</button><h1>{currentField?.name ?? dimension.name}</h1><p>{currentField ? dimension.name : dimension.subtitle}</p></>
        : <><span className="section-label">THE COLLECTION</span><h1>Mathematical dimensions</h1><p>10 dimensions · 47 fields · 282 topics</p></>}
    </div>

    <MathWorlds dimensionId={dimensionId} fieldId={filters.fieldId} spread={spread} rotating={rotating} wireframe={wireframe} visibleIds={visibleIds} selectedId={selection.id} pathIds={pathSet} relationships={activeRelations} onSelect={onWorldSelect} commands={commands} />

    <div className="scene-toolbar" aria-label="3D view controls">
      <IconButton title="Zoom in" onClick={() => commands.current?.zoom(1.2)}><ZoomIn size={18} /></IconButton>
      <IconButton title="Zoom out" onClick={() => commands.current?.zoom(1 / 1.2)}><ZoomOut size={18} /></IconButton>
      <span />
      <IconButton title="Perspective view" onClick={() => commands.current?.view('perspective')}><Compass size={18} /></IconButton>
      <IconButton title="Top view" onClick={() => commands.current?.view('top')}><Grid2X2 size={18} /></IconButton>
      <IconButton title="Wireframe" active={wireframe} onClick={() => setWireframe(!wireframe)}><Network size={18} /></IconButton>
      <IconButton title={rotating ? 'Pause rotation' : 'Rotate automatically'} active={rotating} onClick={() => setRotating(!rotating)}>{rotating ? <Pause size={18} /> : <Play size={18} />}</IconButton>
      <span />
      <IconButton title="Reset view" onClick={() => commands.current?.reset()}><RotateCcw size={18} /></IconButton>
    </div>

    {dimension && <div className="structure-control">
      <div><span>Explore structure</span><output>{Math.round(spread * 100)}%</output></div>
      <input aria-label="Explode dimension" type="range" min="0" max="100" value={Math.round(spread * 100)} onChange={e => setSpread(Number(e.target.value) / 100)} />
      <div className="structure-endpoints"><button onClick={() => setSpread(0)}>Assembled</button><button onClick={() => setSpread(1)}>{currentField ? 'Individual topics' : 'Individual fields'}</button></div>
    </div>}
    {!dimension && <div className="collection-footer"><span><Layers3 size={15} />10 mathematical worlds</span><button onClick={randomTopic}><Shuffle size={15} />Surprise me</button></div>}

    {detailsOpen && <aside className="atlas-detail">
      <div className="detail-toolbar"><span>ATLAS ENTRY</span><IconButton title="Close entry details" onClick={() => setDetailsOpen(false)}><X size={18} /></IconButton></div>
      <DetailPanel selection={selection} topic={selection.kind === 'topic' ? getTopic(selection.id) : undefined} region={selection.kind === 'region' ? getRegion(selection.id) : undefined} person={selection.kind === 'person' ? getPerson(selection.id) : undefined} work={selection.kind === 'work' ? getWork(selection.id) : undefined} era={selection.kind === 'era' ? getEra(selection.id) : undefined} application={selection.kind === 'application' ? applications.find(a => a.id === selection.id) : undefined} bookmarks={bookmarks} toggleBookmark={toggleBookmark} selectRecord={selectRecord} history={history} validationErrors={validation.filter(v => v.severity === 'error').length} validationWarnings={validation.filter(v => v.severity === 'warning').length} />
    </aside>}
    <footer className="atlas-footer"><span>Math Atlas</span><span>Objects of thought.</span><span>{atlasStats.people} people · {atlasStats.works} landmark works</span></footer>
  </main>;
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-[#dce3df] bg-[#edf1ef] px-2 py-1 text-xs font-semibold">
      {children}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t-2 border-[#dce3df]/35 pt-3">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-[#6c7874]">{title}</h3>
      {children}
    </section>
  );
}

function DetailPanel({
  selection,
  topic,
  region,
  person,
  work,
  era,
  application,
  bookmarks,
  toggleBookmark,
  selectRecord,
  history,
  validationErrors,
  validationWarnings,
}: {
  selection: Selection;
  topic?: Topic;
  region?: (typeof regions)[number];
  person?: (typeof people)[number];
  work?: (typeof works)[number];
  era?: (typeof eras)[number];
  application?: (typeof applications)[number];
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  selectRecord: (next: Selection) => void;
  history: Selection[];
  validationErrors: number;
  validationWarnings: number;
}) {
  const title =
    topic?.name ??
    region?.name ??
    person?.name ??
    work?.title ??
    era?.name ??
    application?.name ??
    'Math Atlas';
  const subtitle =
    topic ? `${getRegion(topic.fieldId)?.name} - ${topic.difficulty}` :
    region ? `${region.family} region` :
    person ? `${person.lifespan} - ${person.region}` :
    work ? `${work.year} - ${work.authors.join(', ')}` :
    era ? era.span :
    application ? 'Application domain' :
    '';

  return (
    <>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#76817e]">
            {shortKind(selection.kind)}
          </p>
          <h2 className="text-2xl font-semibold leading-none">{title}</h2>
          <p className="mt-1 text-sm font-bold text-[#6c7874]">{subtitle}</p>
        </div>
        {topic ? (
          <IconButton
            title={bookmarks.includes(topic.id) ? 'Remove bookmark' : 'Bookmark topic'}
            active={bookmarks.includes(topic.id)}
            onClick={() => toggleBookmark(topic.id)}
          >
            <Bookmark size={18} />
          </IconButton>
        ) : null}
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-auto pr-1">
        {topic ? (
          <>
            <div className="flex flex-wrap gap-2">
              {topic.tags.map((tag) => <Chip key={tag}>{tag}</Chip>)}
              <Chip>{getEra(topic.eraId)?.name}</Chip>
            </div>
            <p className="text-base font-semibold leading-relaxed">{topic.overview}</p>
            <Section title="Formal formulation">
              <p className="rounded-md border border-[#dce3df] bg-[#f4f7f5] p-3 font-mono text-sm leading-relaxed ">
                {topic.formal}
              </p>
            </Section>
            <Section title="Key ideas">
              <ul className="grid gap-2">
                {topic.keyIdeas.map((idea) => <li key={idea} className="font-semibold">- {idea}</li>)}
              </ul>
            </Section>
            <Section title="Why it matters">
              <p className="font-semibold leading-relaxed">{topic.whyItMatters}</p>
            </Section>
            <Section title="Prerequisites and related topics">
              <div className="flex flex-wrap gap-2">
                {uniq([...topic.prerequisites, ...topic.related]).map((id) => {
                  const related = getTopic(id);
                  return related ? (
                    <button
                      type="button"
                      key={id}
                      onClick={() => selectRecord({ kind: 'topic', id })}
                      className="rounded-md border border-[#dce3df] bg-[#e5efea] px-2 py-1 text-xs font-semibold"
                    >
                      {related.name}
                    </button>
                  ) : null;
                })}
              </div>
            </Section>
            <Section title="Learning path">
              <ol className="grid gap-1">
                {findLearningPath(topic.id).map((id, index) => (
                  <li key={id} className="font-semibold">
                    {index + 1}. {getTopic(id)?.name}
                  </li>
                ))}
              </ol>
            </Section>
            <Section title="History">
              <p className="font-semibold leading-relaxed">{topic.historicalContext}</p>
            </Section>
            <Section title="Major contributors">
              <div className="grid gap-2">
                {topic.contributorIds.map((id) => {
                  const contributor = getPerson(id);
                  return contributor ? (
                    <button
                      type="button"
                      key={id}
                      onClick={() => selectRecord({ kind: 'person', id })}
                      className="rounded-md border border-[#dce3df] bg-white/80 p-2 text-left font-semibold"
                    >
                      {contributor.name}
                      <span className="block text-xs font-bold text-[#6c7874]">{contributor.majorContributions[0]}</span>
                    </button>
                  ) : null;
                })}
              </div>
            </Section>
            <Section title="Landmark works">
              <div className="grid gap-2">
                {topic.workIds.map((id) => {
                  const item = getWork(id);
                  return item ? (
                    <button
                      type="button"
                      key={id}
                      onClick={() => selectRecord({ kind: 'work', id })}
                      className="rounded-md border border-[#dce3df] bg-white/80 p-2 text-left font-semibold"
                    >
                      {item.title}
                      <span className="block text-xs font-bold text-[#6c7874]">{item.year} - {item.authors.join(', ')}</span>
                    </button>
                  ) : null;
                })}
              </div>
            </Section>
            <Section title="Example problems">
              <ul className="grid gap-2">
                {topic.exampleProblems.map((problem) => <li key={problem} className="font-semibold">- {problem}</li>)}
              </ul>
            </Section>
            <Section title="Applications and research">
              <div className="mb-2 flex flex-wrap gap-2">{topic.applications.map((item) => <Chip key={item}>{item}</Chip>)}</div>
              <ul className="grid gap-2">
                {topic.researchDirections.map((item) => <li key={item} className="font-semibold">- {item}</li>)}
              </ul>
            </Section>
            <Section title="References">
              <div className="grid gap-2">
                {topic.externalRefs.map((ref) => (
                  <a key={ref.url} href={ref.url} target="_blank" className="font-semibold underline decoration-2 underline-offset-4">
                    {ref.label}
                  </a>
                ))}
              </div>
            </Section>
            <Section title="Visible relationships">
              <div className="grid gap-2">
                {relatedEdgesFor(topic.id).slice(0, 10).map((rel) => {
                  const other = getTopic(rel.sourceId === topic.id ? rel.targetId : rel.sourceId);
                  return other ? (
                    <button
                      type="button"
                      key={rel.id}
                      onClick={() => selectRecord({ kind: 'topic', id: other.id })}
                      className="rounded-md border border-[#dce3df] bg-[#edf1ef] p-2 text-left text-sm font-semibold"
                    >
                      {relationshipLabels[rel.type]}: {other.name}
                      <span className="block text-xs font-bold text-[#6c7874]">{rel.label}</span>
                    </button>
                  ) : null;
                })}
              </div>
            </Section>
          </>
        ) : null}

        {region ? (
          <>
            <p className="text-base font-semibold leading-relaxed">{region.description}</p>
            <Section title="Topics in this region">
              <div className="grid gap-2">
                {topics.filter((item) => item.fieldId === region.id).map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => selectRecord({ kind: 'topic', id: item.id })}
                    className="rounded-md border border-[#dce3df] bg-white/80 p-2 text-left font-semibold"
                  >
                    {item.name}
                    <span className="block text-xs font-bold text-[#6c7874]">{item.difficulty}</span>
                  </button>
                ))}
              </div>
            </Section>
          </>
        ) : null}

        {person ? (
          <>
            <Section title="Major contributions">
              <ul className="grid gap-2">{person.majorContributions.map((item) => <li key={item} className="font-semibold">- {item}</li>)}</ul>
            </Section>
            <Section title="Associated topics">
              <div className="flex flex-wrap gap-2">
                {person.associatedTopicIds.map((id) => {
                  const item = getTopic(id);
                  return item ? <button key={id} type="button" onClick={() => selectRecord({ kind: 'topic', id })} className="rounded-md border border-[#dce3df] bg-[#e5efea] px-2 py-1 text-xs font-semibold">{item.name}</button> : null;
                })}
              </div>
            </Section>
            <Section title="Historical context">
              <p className="font-semibold leading-relaxed">{person.historicalContext}</p>
            </Section>
            <Section title="References">
              {person.refs.map((ref) => <a key={ref.url} href={ref.url} target="_blank" className="block font-semibold underline decoration-2 underline-offset-4">{ref.label}</a>)}
            </Section>
          </>
        ) : null}

        {work ? (
          <>
            <p className="text-base font-semibold leading-relaxed">{work.whyItMattered}</p>
            <Section title="Citation">
              <p className="rounded-md border border-[#dce3df] bg-[#f4f7f5] p-3 font-mono text-sm ">{work.citation}</p>
            </Section>
            <Section title="Associated topics">
              <div className="flex flex-wrap gap-2">
                {work.associatedTopicIds.map((id) => {
                  const item = getTopic(id);
                  return item ? <button key={id} type="button" onClick={() => selectRecord({ kind: 'topic', id })} className="rounded-md border border-[#dce3df] bg-[#e5efea] px-2 py-1 text-xs font-semibold">{item.name}</button> : null;
                })}
              </div>
            </Section>
            <a href={work.link} target="_blank" className="block font-semibold underline decoration-2 underline-offset-4">Public reference search</a>
          </>
        ) : null}

        {era ? (
          <>
            <p className="text-base font-semibold leading-relaxed">{era.summary}</p>
            <Section title="Highlights">
              <ul className="grid gap-2">{era.highlights.map((item) => <li key={item} className="font-semibold">- {item}</li>)}</ul>
            </Section>
            <Section title="Regions connected to this era">
              <div className="grid gap-2">
                {regions.filter((item) => item.eraId === era.id).map((item) => (
                  <button key={item.id} type="button" onClick={() => selectRecord({ kind: 'region', id: item.id })} className="rounded-md border border-[#dce3df] bg-white/80 p-2 text-left font-semibold">{item.name}</button>
                ))}
              </div>
            </Section>
          </>
        ) : null}

        {application ? (
          <>
            <p className="text-base font-semibold leading-relaxed">{application.summary}</p>
            <Section title="Applied topics">
              <div className="grid gap-2">
                {application.topicIds.map((id) => {
                  const item = getTopic(id);
                  return item ? <button key={id} type="button" onClick={() => selectRecord({ kind: 'topic', id })} className="rounded-md border border-[#dce3df] bg-white/80 p-2 text-left font-semibold">{item.name}</button> : null;
                })}
              </div>
            </Section>
          </>
        ) : null}

        <Section title="Navigation trail">
          <div className="flex flex-wrap gap-2">
            {history.length ? history.map((item, index) => (
              <button key={`${item.id}-${index}`} type="button" onClick={() => selectRecord(item)} className="rounded-md border border-[#dce3df] bg-[#edf1ef] px-2 py-1 text-xs font-semibold">
                {shortKind(item.kind)}: {item.id.split(':').pop()?.replaceAll('-', ' ')}
              </button>
            )) : <span className="text-sm font-bold text-[#6c7874]">Select entries to build a trail.</span>}
          </div>
        </Section>

        <Section title="Dataset check">
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            <span>{atlasStats.regions} regions</span>
            <span>{atlasStats.topics} topics</span>
            <span>{atlasStats.people} people</span>
            <span>{atlasStats.works} works</span>
            <span>{atlasStats.relationships} links</span>
            <span>{validationErrors} errors, {validationWarnings} warnings</span>
          </div>
        </Section>
      </div>
    </>
  );
}
