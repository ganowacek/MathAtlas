export type FormKind = 'lattice' | 'rings' | 'torus' | 'prime' | 'crystal' | 'solids' | 'mobius' | 'wave' | 'saddle' | 'helicoid' | 'gaussian' | 'histogram' | 'network' | 'tree' | 'helix' | 'lorenz' | 'integral';
export const dimensions = [
  { id: 'foundations', name: 'Foundations', subtitle: 'The architecture of truth', color: '#527c86', formula: 'A ⊢ B', form: 'lattice', fields: ['foundations', 'logic', 'set-theory', 'category-theory', 'history-of-math', 'math-education'] },
  { id: 'numbers', name: 'Number theory', subtitle: 'Patterns in the integers', color: '#bf7542', formula: 'p ∈ ℙ', form: 'prime', fields: ['number-theory', 'cryptography'] },
  { id: 'algebra', name: 'Algebra', subtitle: 'The language of symmetry', color: '#668459', formula: 'G ↷ V', form: 'crystal', fields: ['algebra', 'linear-algebra', 'abstract-algebra', 'commutative-algebra', 'algebraic-geometry', 'lie-theory'] },
  { id: 'geometry', name: 'Geometry', subtitle: 'Space takes shape', color: '#cc8a3f', formula: 'V − E + F = 2', form: 'solids', fields: ['geometry', 'differential-geometry'] },
  { id: 'topology', name: 'Topology', subtitle: 'Beyond the surface', color: '#b65c70', formula: 'χ = 2 − 2g', form: 'mobius', fields: ['topology'] },
  { id: 'analysis', name: 'Analysis & calculus', subtitle: 'A world in continuous motion', color: '#5487a4', formula: '∫ f(x) dx', form: 'wave', fields: ['analysis', 'real-analysis', 'complex-analysis', 'functional-analysis', 'calculus', 'differential-equations', 'dynamical-systems', 'harmonic-analysis', 'calculus-of-variations', 'partial-differential-equations'] },
  { id: 'probability', name: 'Probability & statistics', subtitle: 'The shape of uncertainty', color: '#ad6760', formula: 'P(A | B)', form: 'gaussian', fields: ['probability', 'statistics', 'probabilistic-method'] },
  { id: 'discrete', name: 'Discrete mathematics', subtitle: 'Connections, one by one', color: '#548f87', formula: 'G = (V, E)', form: 'network', fields: ['discrete-math', 'combinatorics', 'graph-theory'] },
  { id: 'computation', name: 'Computation', subtitle: 'From logic to intelligence', color: '#817491', formula: 'λx.f(x)', form: 'tree', fields: ['computation', 'theoretical-cs', 'information-theory', 'machine-learning-theory', 'proof-assistants', 'mathematical-logic-cs'] },
  { id: 'applied', name: 'Applied mathematics', subtitle: 'Mathematics meets the world', color: '#5c7e99', formula: 'dx/dt = f(x)', form: 'helix', fields: ['optimization', 'game-theory', 'mathematical-physics', 'numerical-analysis', 'mathematical-finance', 'mathematical-biology', 'control-theory', 'operations-research'] },
] satisfies Array<{ id: string; name: string; subtitle: string; color: string; formula: string; form: FormKind; fields: string[] }>;

export type Dimension = (typeof dimensions)[number];
export const dimensionForField = (fieldId: string) => dimensions.find(d => d.fields.includes(fieldId));

const topicForms: Record<string, FormKind> = {
  'point-set-topology': 'network', compactness: 'torus', connectedness: 'rings', homotopy: 'mobius', homology: 'torus', manifolds: 'saddle',
  limits: 'wave', derivatives: 'saddle', integrals: 'integral', 'taylor-series': 'wave', 'multivariable-calculus': 'saddle', 'vector-calculus': 'network',
  'euclidean-geometry': 'solids', 'non-euclidean-geometry': 'saddle', 'projective-geometry': 'helicoid', 'convex-geometry': 'crystal', 'discrete-geometry': 'lattice', 'incidence-geometry': 'network',
  'sample-spaces': 'network', 'random-variables': 'histogram', expectation: 'gaussian', 'law-of-large-numbers': 'histogram', 'central-limit-theorem': 'gaussian', 'markov-chains': 'network',
  'prime-numbers': 'prime', 'modular-arithmetic': 'rings', 'diophantine-equations': 'lattice', 'algebraic-number-theory': 'crystal', 'analytic-number-theory': 'wave', 'modular-forms': 'wave',
  polynomials: 'wave', groups: 'rings', rings: 'crystal', fields: 'lattice', modules: 'lattice', representations: 'crystal',
  'paths-and-cycles': 'rings', trees: 'tree', 'planar-graphs': 'network', 'graph-coloring': 'network', 'network-flows': 'network', 'spectral-graph-theory': 'lattice',
  entropy: 'histogram', 'channel-capacity': 'wave', 'error-correcting-codes': 'lattice', 'mutual-information': 'rings',
  chaos: 'lorenz', 'phase-portraits': 'lorenz', bifurcations: 'tree', 'fixed-points': 'crystal', 'smooth-manifolds': 'saddle', 'tangent-spaces': 'lattice', curvature: 'saddle', 'fiber-bundles': 'torus',
};
export const formForTopic = (id: string, fallback: FormKind) => topicForms[id.split(':')[1]] ?? fallback;

export const fieldForms: Record<string, FormKind> = {
  foundations: 'lattice', logic: 'tree', 'set-theory': 'rings', 'category-theory': 'network', 'history-of-math': 'helix', 'math-education': 'solids',
  'number-theory': 'prime', cryptography: 'lattice', algebra: 'crystal', 'linear-algebra': 'lattice', 'abstract-algebra': 'solids', 'commutative-algebra': 'lattice', 'algebraic-geometry': 'saddle', 'lie-theory': 'rings',
  geometry: 'solids', 'differential-geometry': 'saddle', topology: 'mobius', analysis: 'wave', 'real-analysis': 'integral', 'complex-analysis': 'helicoid', 'functional-analysis': 'wave', calculus: 'integral', 'differential-equations': 'wave', 'dynamical-systems': 'lorenz', 'harmonic-analysis': 'wave', 'calculus-of-variations': 'helicoid', 'partial-differential-equations': 'saddle',
  probability: 'gaussian', statistics: 'histogram', 'probabilistic-method': 'network', 'discrete-math': 'lattice', combinatorics: 'crystal', 'graph-theory': 'network',
  computation: 'tree', 'theoretical-cs': 'lattice', 'information-theory': 'wave', 'machine-learning-theory': 'network', 'proof-assistants': 'crystal', 'mathematical-logic-cs': 'tree',
  optimization: 'saddle', 'game-theory': 'lattice', 'mathematical-physics': 'rings', 'numerical-analysis': 'wave', 'mathematical-finance': 'histogram', 'mathematical-biology': 'helix', 'control-theory': 'lorenz', 'operations-research': 'network',
};
