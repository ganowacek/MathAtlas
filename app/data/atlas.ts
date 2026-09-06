export type Difficulty =
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'graduate'
  | 'research';

export type AtlasMode = 'topics' | 'history' | 'people' | 'works';

export type RelationshipType =
  | 'prerequisite'
  | 'historically-influenced'
  | 'applied-in'
  | 'generalized-by'
  | 'example-of'
  | 'related-to';

export type AtlasTag =
  | 'pure'
  | 'applied'
  | 'computational'
  | 'historical'
  | 'foundational';

export type Region = {
  id: string;
  name: string;
  family: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  accent: string;
  eraId: string;
  description: string;
  doodle: string;
};

export type Topic = {
  id: string;
  name: string;
  fieldId: string;
  x: number;
  y: number;
  difficulty: Difficulty;
  eraId: string;
  tags: AtlasTag[];
  overview: string;
  formal: string;
  keyIdeas: string[];
  whyItMatters: string;
  prerequisites: string[];
  related: string[];
  learningPath: string[];
  historicalContext: string;
  contributorIds: string[];
  workIds: string[];
  exampleProblems: string[];
  applications: string[];
  researchDirections: string[];
  externalRefs: ExternalRef[];
  textbooks: Textbook[];
  keyFormulas: KeyFormula[];
};

export type Person = {
  id: string;
  name: string;
  lifespan: string;
  region: string;
  fieldIds: string[];
  majorContributions: string[];
  associatedTopicIds: string[];
  notableWorkIds: string[];
  historicalContext: string;
  refs: ExternalRef[];
};

export type Work = {
  id: string;
  title: string;
  authors: string[];
  year: number;
  fieldId: string;
  whyItMattered: string;
  associatedTopicIds: string[];
  citation: string;
  link: string;
};

export type Era = {
  id: string;
  name: string;
  span: string;
  start: number;
  end: number;
  summary: string;
  highlights: string[];
};

export type ApplicationDomain = {
  id: string;
  name: string;
  summary: string;
  topicIds: string[];
};

export type Relationship = {
  id: string;
  sourceId: string;
  targetId: string;
  type: RelationshipType;
  label: string;
};

export type ExternalRef = {
  label: string;
  url: string;
  kind: 'doi' | 'arxiv' | 'archive' | 'encyclopedia' | 'reference' | 'todo';
};

export type Textbook = {
  title: string;
  authors: string[];
  edition?: string;
  year: number;
  why: string;
  url?: string;
};

export type KeyFormula = {
  label: string;
  latex: string;
};

type RegionSeed = Omit<Region, 'doodle'> & {
  topics: string[];
  tags: AtlasTag[];
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const eras: Era[] = [
  {
    id: 'ancient',
    name: 'Ancient mathematics',
    span: '3000 BCE-500 BCE',
    start: -3000,
    end: -500,
    summary:
      'Counting, surveying, astronomy, and algorithmic calculation mature in Egypt, Mesopotamia, China, and other early mathematical cultures.',
    highlights: ['sexagesimal arithmetic', 'geometry for land and building', 'astronomical tables'],
  },
  {
    id: 'greek',
    name: 'Greek mathematics',
    span: '600 BCE-300 CE',
    start: -600,
    end: 300,
    summary:
      'Greek schools emphasize proof, axioms, geometry, number theory, and early analysis of curves and infinitesimals.',
    highlights: ['Euclidean proof', 'conic sections', 'Archimedean exhaustion'],
  },
  {
    id: 'indian',
    name: 'Indian mathematics',
    span: '400-1400',
    start: 400,
    end: 1400,
    summary:
      'Indian mathematicians develop positional notation, zero, trigonometric tables, infinite series, and algebraic procedures.',
    highlights: ['decimal place value', 'sine tables', 'Kerala series'],
  },
  {
    id: 'islamic',
    name: 'Islamic Golden Age',
    span: '800-1400',
    start: 800,
    end: 1400,
    summary:
      'Translation, algebra, optics, astronomy, geometry, and numerical methods flourish across Baghdad, Persia, North Africa, and Al-Andalus.',
    highlights: ['algebra as a discipline', 'algorithmic calculation', 'spherical trigonometry'],
  },
  {
    id: 'renaissance',
    name: 'Renaissance mathematics',
    span: '1400-1650',
    start: 1400,
    end: 1650,
    summary:
      'Symbolic algebra, analytic geometry, probability, and mechanics accelerate alongside navigation, commerce, and printing.',
    highlights: ['cubic equations', 'coordinate geometry', 'early probability'],
  },
  {
    id: 'calculus-era',
    name: 'Enlightenment and calculus',
    span: '1650-1800',
    start: 1650,
    end: 1800,
    summary:
      'Calculus, mechanics, differential equations, and probability become common languages for changing quantities and physical law.',
    highlights: ['infinitesimal calculus', 'variational principles', 'Eulerian analysis'],
  },
  {
    id: 'rigor',
    name: '19th-century rigor and abstraction',
    span: '1800-1900',
    start: 1800,
    end: 1900,
    summary:
      'Mathematics rebuilds foundations with rigor while abstract algebra, topology, set theory, and non-Euclidean geometry emerge.',
    highlights: ['epsilon-delta rigor', 'groups and fields', 'set-theoretic foundations'],
  },
  {
    id: 'modern',
    name: '20th-century modern mathematics',
    span: '1900-2000',
    start: 1900,
    end: 2000,
    summary:
      'Formal logic, functional analysis, topology, probability, computing, category theory, and modern geometry reshape the discipline.',
    highlights: ['Hilbert program', 'Bourbaki structures', 'Turing computation'],
  },
  {
    id: 'contemporary',
    name: 'Contemporary mathematics',
    span: '2000-today',
    start: 2000,
    end: 2026,
    summary:
      'Proof assistants, data science, quantum information, modern cryptography, networks, and high-dimensional geometry widen the atlas.',
    highlights: ['formalized proof', 'machine learning theory', 'post-quantum cryptography'],
  },
];

const regionSeeds: RegionSeed[] = [
  {
    id: 'foundations',
    name: 'Foundations',
    family: 'Foundational',
    x: 250,
    y: 220,
    width: 300,
    height: 210,
    color: '#ffd166',
    accent: '#7a4f00',
    eraId: 'modern',
    description: 'Questions about proof, objects, truth, infinity, and the formal languages mathematics uses to talk about itself.',
    topics: ['Axiomatic method', 'Proof theory', 'Model theory', 'Recursion theory', 'Foundational programs', 'Constructive mathematics'],
    tags: ['foundational', 'historical'],
  },
  {
    id: 'logic',
    name: 'Logic',
    family: 'Foundational',
    x: 575,
    y: 165,
    width: 285,
    height: 205,
    color: '#f4a261',
    accent: '#703900',
    eraId: 'modern',
    description: 'The mathematics of valid inference, formal languages, computability, consistency, and definability.',
    topics: ['Propositional logic', 'Predicate logic', 'Completeness theorem', 'Incompleteness theorems', 'Modal logic', 'Intuitionistic logic'],
    tags: ['foundational', 'pure'],
  },
  {
    id: 'set-theory',
    name: 'Set Theory',
    family: 'Foundational',
    x: 900,
    y: 230,
    width: 290,
    height: 210,
    color: '#ffafcc',
    accent: '#7d2755',
    eraId: 'rigor',
    description: 'The study of sets, membership, cardinality, ordinals, forcing, and the layered universe of mathematical objects.',
    topics: ['Naive set theory', 'Zermelo-Fraenkel axioms', 'Cardinals', 'Ordinals', 'Continuum hypothesis', 'Forcing'],
    tags: ['foundational', 'pure'],
  },
  {
    id: 'category-theory',
    name: 'Category Theory',
    family: 'Foundational',
    x: 1215,
    y: 185,
    width: 320,
    height: 220,
    color: '#cdb4db',
    accent: '#56306f',
    eraId: 'modern',
    description: 'A structural language for objects, morphisms, functors, universal properties, and relationships between theories.',
    topics: ['Categories and functors', 'Natural transformations', 'Adjunctions', 'Limits and colimits', 'Monoidal categories', 'Topos theory'],
    tags: ['foundational', 'pure'],
  },
  {
    id: 'number-theory',
    name: 'Number Theory',
    family: 'Pure',
    x: 270,
    y: 520,
    width: 320,
    height: 230,
    color: '#a7c957',
    accent: '#3e5f20',
    eraId: 'greek',
    description: 'The arithmetic structure of integers, primes, congruences, Diophantine equations, and arithmetic geometry.',
    topics: ['Prime numbers', 'Modular arithmetic', 'Diophantine equations', 'Algebraic number theory', 'Analytic number theory', 'Modular forms'],
    tags: ['pure', 'historical'],
  },
  {
    id: 'algebra',
    name: 'Algebra',
    family: 'Pure',
    x: 620,
    y: 520,
    width: 300,
    height: 230,
    color: '#90dbf4',
    accent: '#075b76',
    eraId: 'islamic',
    description: 'Symbolic and structural methods for equations, operations, symmetries, rings, fields, modules, and representations.',
    topics: ['Polynomials', 'Groups', 'Rings', 'Fields', 'Modules', 'Representations'],
    tags: ['pure'],
  },
  {
    id: 'linear-algebra',
    name: 'Linear Algebra',
    family: 'Pure and Applied',
    x: 960,
    y: 520,
    width: 330,
    height: 230,
    color: '#8ecae6',
    accent: '#07577d',
    eraId: 'rigor',
    description: 'Vector spaces, linear maps, matrices, determinants, eigenvalues, and the geometry of linear transformations.',
    topics: ['Vector spaces', 'Matrices', 'Determinants', 'Eigenvalues', 'Inner product spaces', 'Singular value decomposition'],
    tags: ['pure', 'applied', 'computational'],
  },
  {
    id: 'abstract-algebra',
    name: 'Abstract Algebra',
    family: 'Pure',
    x: 1320,
    y: 520,
    width: 345,
    height: 235,
    color: '#bde0fe',
    accent: '#1d5f92',
    eraId: 'rigor',
    description: 'Algebraic structures studied through axioms, homomorphisms, quotients, extensions, and symmetry.',
    topics: ['Group theory', 'Ring theory', 'Field theory', 'Galois theory', 'Homological algebra', 'Representation theory'],
    tags: ['pure'],
  },
  {
    id: 'commutative-algebra',
    name: 'Commutative Algebra',
    family: 'Pure',
    x: 1690,
    y: 520,
    width: 330,
    height: 225,
    color: '#caf0f8',
    accent: '#006073',
    eraId: 'modern',
    description: 'Commutative rings and modules, especially ideals, localization, dimension, and singularities.',
    topics: ['Ideals', 'Noetherian rings', 'Localization', 'Primary decomposition', 'Dimension theory', 'Cohen-Macaulay rings'],
    tags: ['pure'],
  },
  {
    id: 'algebraic-geometry',
    name: 'Algebraic Geometry',
    family: 'Pure',
    x: 2050,
    y: 520,
    width: 350,
    height: 240,
    color: '#caffbf',
    accent: '#2c6e1f',
    eraId: 'rigor',
    description: 'Geometry defined by polynomial equations, from classical varieties to schemes, sheaves, stacks, and moduli.',
    topics: ['Affine varieties', 'Projective varieties', 'Schemes', 'Sheaves', 'Cohomology', 'Moduli spaces'],
    tags: ['pure'],
  },
  {
    id: 'geometry',
    name: 'Geometry',
    family: 'Shape',
    x: 320,
    y: 855,
    width: 330,
    height: 240,
    color: '#fdffb6',
    accent: '#706d00',
    eraId: 'greek',
    description: 'The study of shape, size, curvature, construction, incidence, symmetry, and spatial reasoning.',
    topics: ['Euclidean geometry', 'Non-Euclidean geometry', 'Projective geometry', 'Convex geometry', 'Discrete geometry', 'Incidence geometry'],
    tags: ['pure', 'historical'],
  },
  {
    id: 'topology',
    name: 'Topology',
    family: 'Shape',
    x: 710,
    y: 855,
    width: 325,
    height: 235,
    color: '#b9fbc0',
    accent: '#22733a',
    eraId: 'rigor',
    description: 'Properties preserved by continuous deformation: open sets, compactness, connectedness, holes, and invariants.',
    topics: ['Point-set topology', 'Compactness', 'Connectedness', 'Homotopy', 'Homology', 'Manifolds'],
    tags: ['pure'],
  },
  {
    id: 'differential-geometry',
    name: 'Differential Geometry',
    family: 'Shape',
    x: 1080,
    y: 855,
    width: 345,
    height: 245,
    color: '#98f5e1',
    accent: '#0b695b',
    eraId: 'rigor',
    description: 'Calculus on curves, surfaces, and manifolds, including curvature, geodesics, bundles, and connections.',
    topics: ['Smooth manifolds', 'Tangent spaces', 'Riemannian metrics', 'Curvature', 'Geodesics', 'Fiber bundles'],
    tags: ['pure', 'applied'],
  },
  {
    id: 'analysis',
    name: 'Analysis',
    family: 'Change and Limit',
    x: 250,
    y: 1210,
    width: 315,
    height: 235,
    color: '#ffc6ff',
    accent: '#7b337b',
    eraId: 'calculus-era',
    description: 'Limits, continuity, convergence, approximation, functions, measures, and infinite processes.',
    topics: ['Sequences and series', 'Continuity', 'Differentiation', 'Integration', 'Metric spaces', 'Measure theory'],
    tags: ['pure'],
  },
  {
    id: 'real-analysis',
    name: 'Real Analysis',
    family: 'Change and Limit',
    x: 600,
    y: 1210,
    width: 315,
    height: 235,
    color: '#ffadad',
    accent: '#7e2727',
    eraId: 'rigor',
    description: 'Rigorous study of real-valued functions, limits, measures, integration, and convergence.',
    topics: ['Real numbers', 'Epsilon-delta limits', 'Lebesgue integration', 'Differentiation theorems', 'L p spaces', 'Fourier series'],
    tags: ['pure'],
  },
  {
    id: 'complex-analysis',
    name: 'Complex Analysis',
    family: 'Change and Limit',
    x: 950,
    y: 1210,
    width: 315,
    height: 235,
    color: '#ffd6a5',
    accent: '#7b4a12',
    eraId: 'rigor',
    description: 'Functions of a complex variable, holomorphicity, contour integration, residues, and conformal maps.',
    topics: ['Complex numbers', 'Holomorphic functions', 'Cauchy integral theorem', 'Residues', 'Conformal mapping', 'Riemann surfaces'],
    tags: ['pure', 'applied'],
  },
  {
    id: 'functional-analysis',
    name: 'Functional Analysis',
    family: 'Change and Limit',
    x: 1300,
    y: 1210,
    width: 340,
    height: 235,
    color: '#a0c4ff',
    accent: '#1c4f93',
    eraId: 'modern',
    description: 'Infinite-dimensional vector spaces, operators, Banach and Hilbert spaces, and spectral theory.',
    topics: ['Normed spaces', 'Banach spaces', 'Hilbert spaces', 'Bounded operators', 'Spectral theory', 'Distributions'],
    tags: ['pure', 'applied'],
  },
  {
    id: 'calculus',
    name: 'Calculus',
    family: 'Change and Limit',
    x: 1665,
    y: 1210,
    width: 305,
    height: 225,
    color: '#ffff99',
    accent: '#696900',
    eraId: 'calculus-era',
    description: 'Differentiation and integration as tools for rates, accumulation, optimization, and approximation.',
    topics: ['Limits', 'Derivatives', 'Integrals', 'Taylor series', 'Multivariable calculus', 'Vector calculus'],
    tags: ['applied', 'historical'],
  },
  {
    id: 'differential-equations',
    name: 'Differential Equations',
    family: 'Change and Limit',
    x: 2005,
    y: 1210,
    width: 360,
    height: 240,
    color: '#bdb2ff',
    accent: '#4c3b91',
    eraId: 'calculus-era',
    description: 'Equations relating quantities to their rates of change in time, space, and state variables.',
    topics: ['Ordinary differential equations', 'Partial differential equations', 'Existence and uniqueness', 'Stability', 'Boundary value problems', 'Green functions'],
    tags: ['pure', 'applied', 'computational'],
  },
  {
    id: 'dynamical-systems',
    name: 'Dynamical Systems',
    family: 'Change and Limit',
    x: 2395,
    y: 1210,
    width: 345,
    height: 235,
    color: '#f1c0e8',
    accent: '#7d3c70',
    eraId: 'modern',
    description: 'Long-term behavior of iterated maps and flows: stability, chaos, attractors, bifurcations, and ergodicity.',
    topics: ['Phase portraits', 'Fixed points', 'Bifurcations', 'Chaos', 'Ergodic theory', 'Symbolic dynamics'],
    tags: ['pure', 'applied', 'computational'],
  },
  {
    id: 'probability',
    name: 'Probability',
    family: 'Uncertainty',
    x: 330,
    y: 1580,
    width: 335,
    height: 240,
    color: '#d0f4de',
    accent: '#1d6e3c',
    eraId: 'renaissance',
    description: 'Mathematics of random events, stochastic processes, distributions, conditioning, and limit laws.',
    topics: ['Sample spaces', 'Random variables', 'Expectation', 'Law of large numbers', 'Central limit theorem', 'Markov chains'],
    tags: ['applied', 'pure'],
  },
  {
    id: 'statistics',
    name: 'Statistics',
    family: 'Uncertainty',
    x: 720,
    y: 1580,
    width: 335,
    height: 240,
    color: '#e4c1f9',
    accent: '#63327f',
    eraId: 'modern',
    description: 'Inference from data: estimation, uncertainty, models, experiments, decisions, and prediction.',
    topics: ['Estimation', 'Hypothesis testing', 'Regression', 'Bayesian inference', 'Experimental design', 'Causal inference'],
    tags: ['applied', 'computational'],
  },
  {
    id: 'discrete-math',
    name: 'Discrete Math',
    family: 'Discrete Structures',
    x: 1120,
    y: 1580,
    width: 330,
    height: 235,
    color: '#9bf6ff',
    accent: '#006a74',
    eraId: 'modern',
    description: 'Finite and countable structures: logic, counting, graphs, orders, recurrences, and algorithms.',
    topics: ['Counting principles', 'Recurrence relations', 'Posets', 'Boolean algebra', 'Finite automata', 'Generating functions'],
    tags: ['pure', 'computational'],
  },
  {
    id: 'combinatorics',
    name: 'Combinatorics',
    family: 'Discrete Structures',
    x: 1490,
    y: 1580,
    width: 340,
    height: 235,
    color: '#fdffb6',
    accent: '#726f00',
    eraId: 'modern',
    description: 'Counting, arranging, extremal structure, designs, partitions, and combinatorial proofs.',
    topics: ['Permutations', 'Combinations', 'Inclusion-exclusion', 'Extremal combinatorics', 'Design theory', 'Ramsey theory'],
    tags: ['pure', 'computational'],
  },
  {
    id: 'graph-theory',
    name: 'Graph Theory',
    family: 'Discrete Structures',
    x: 1870,
    y: 1580,
    width: 335,
    height: 235,
    color: '#b9fbc0',
    accent: '#22733a',
    eraId: 'modern',
    description: 'Vertices, edges, networks, paths, cycles, coloring, flows, matchings, and graph invariants.',
    topics: ['Paths and cycles', 'Trees', 'Planar graphs', 'Graph coloring', 'Network flows', 'Spectral graph theory'],
    tags: ['pure', 'applied', 'computational'],
  },
  {
    id: 'computation',
    name: 'Computation',
    family: 'Computation',
    x: 250,
    y: 1940,
    width: 330,
    height: 235,
    color: '#a0c4ff',
    accent: '#1b4f95',
    eraId: 'modern',
    description: 'Algorithms, computation models, complexity, programming languages, and formal limits of mechanical calculation.',
    topics: ['Algorithms', 'Data structures', 'Computability', 'Complexity classes', 'Lambda calculus', 'Programming language semantics'],
    tags: ['computational', 'foundational'],
  },
  {
    id: 'theoretical-cs',
    name: 'Theoretical CS',
    family: 'Computation',
    x: 620,
    y: 1940,
    width: 340,
    height: 235,
    color: '#90dbf4',
    accent: '#075b76',
    eraId: 'modern',
    description: 'The mathematical study of algorithms, complexity, automata, randomness, logic, and computation itself.',
    topics: ['Automata theory', 'Formal languages', 'P versus NP', 'Approximation algorithms', 'Randomized algorithms', 'Quantum computation'],
    tags: ['computational', 'foundational'],
  },
  {
    id: 'cryptography',
    name: 'Cryptography',
    family: 'Computation',
    x: 990,
    y: 1940,
    width: 330,
    height: 235,
    color: '#ffafcc',
    accent: '#7d2755',
    eraId: 'contemporary',
    description: 'Secure communication and computation built from number theory, complexity, probability, and protocols.',
    topics: ['Public-key cryptography', 'RSA', 'Elliptic curve cryptography', 'Zero-knowledge proofs', 'Lattices', 'Post-quantum cryptography'],
    tags: ['applied', 'computational'],
  },
  {
    id: 'optimization',
    name: 'Optimization',
    family: 'Decision',
    x: 1380,
    y: 1940,
    width: 335,
    height: 235,
    color: '#ffd166',
    accent: '#755000',
    eraId: 'modern',
    description: 'Finding best feasible choices under constraints, from convex analysis to integer programs and learning algorithms.',
    topics: ['Linear programming', 'Convex optimization', 'Integer programming', 'Duality', 'Gradient descent', 'Optimal transport'],
    tags: ['applied', 'computational'],
  },
  {
    id: 'game-theory',
    name: 'Game Theory',
    family: 'Decision',
    x: 1750,
    y: 1940,
    width: 325,
    height: 230,
    color: '#cdb4db',
    accent: '#56306f',
    eraId: 'modern',
    description: 'Strategic interaction: equilibria, incentives, bargaining, auctions, mechanism design, and repeated games.',
    topics: ['Normal-form games', 'Nash equilibrium', 'Zero-sum games', 'Repeated games', 'Mechanism design', 'Auction theory'],
    tags: ['applied', 'pure'],
  },
  {
    id: 'mathematical-physics',
    name: 'Mathematical Physics',
    family: 'Applied',
    x: 290,
    y: 2310,
    width: 360,
    height: 250,
    color: '#ffc6ff',
    accent: '#7b337b',
    eraId: 'calculus-era',
    description: 'Mathematical structures behind mechanics, fields, relativity, quantum theory, statistical physics, and symmetry.',
    topics: ['Classical mechanics', 'Hamiltonian systems', 'Quantum mechanics', 'Statistical mechanics', 'Relativity', 'Gauge theory'],
    tags: ['applied', 'pure'],
  },
  {
    id: 'numerical-analysis',
    name: 'Numerical Analysis',
    family: 'Applied',
    x: 700,
    y: 2310,
    width: 340,
    height: 235,
    color: '#8ecae6',
    accent: '#07577d',
    eraId: 'modern',
    description: 'Algorithms for approximate calculation with error control, stability, discretization, and finite precision.',
    topics: ['Floating-point arithmetic', 'Numerical linear algebra', 'Root finding', 'Interpolation', 'Finite element method', 'Monte Carlo methods'],
    tags: ['applied', 'computational'],
  },
  {
    id: 'mathematical-finance',
    name: 'Mathematical Finance',
    family: 'Applied',
    x: 1080,
    y: 2310,
    width: 350,
    height: 235,
    color: '#caffbf',
    accent: '#2c6e1f',
    eraId: 'contemporary',
    description: 'Stochastic calculus, risk, pricing, portfolio theory, markets, and optimization under uncertainty.',
    topics: ['Portfolio theory', 'Brownian motion', 'Ito calculus', 'Black-Scholes equation', 'Risk measures', 'Market microstructure'],
    tags: ['applied', 'computational'],
  },
  {
    id: 'mathematical-biology',
    name: 'Mathematical Biology',
    family: 'Applied',
    x: 1480,
    y: 2310,
    width: 350,
    height: 235,
    color: '#d0f4de',
    accent: '#1d6e3c',
    eraId: 'contemporary',
    description: 'Models of living systems: populations, epidemics, evolution, networks, physiology, and pattern formation.',
    topics: ['Population dynamics', 'Epidemic models', 'Reaction-diffusion systems', 'Evolutionary game theory', 'Systems biology', 'Phylogenetics'],
    tags: ['applied', 'computational'],
  },
  {
    id: 'control-theory',
    name: 'Control Theory',
    family: 'Applied',
    x: 1870,
    y: 2310,
    width: 335,
    height: 235,
    color: '#bdb2ff',
    accent: '#4c3b91',
    eraId: 'modern',
    description: 'Feedback, stability, observability, controllability, and optimal control for engineered and natural systems.',
    topics: ['Feedback systems', 'State-space models', 'Controllability', 'Observability', 'Linear quadratic regulator', 'Robust control'],
    tags: ['applied', 'computational'],
  },
  {
    id: 'information-theory',
    name: 'Information Theory',
    family: 'Applied',
    x: 2250,
    y: 2310,
    width: 340,
    height: 235,
    color: '#9bf6ff',
    accent: '#006a74',
    eraId: 'modern',
    description: 'Entropy, coding, compression, transmission, capacity, inference, and the mathematical limits of communication.',
    topics: ['Entropy', 'Source coding', 'Channel capacity', 'Error-correcting codes', 'Rate-distortion theory', 'Mutual information'],
    tags: ['applied', 'computational'],
  },
  {
    id: 'calculus-of-variations',
    name: 'Calculus of Variations',
    family: 'Decision',
    x: 2180,
    y: 1940,
    width: 350,
    height: 230,
    color: '#ffadad',
    accent: '#7e2727',
    eraId: 'calculus-era',
    description: 'Optimization over functions, Euler-Lagrange equations, minimal surfaces, geodesics, and variational principles.',
    topics: ['Functionals', 'Euler-Lagrange equation', 'Minimal surfaces', 'Direct method', 'Noether theorem', 'Optimal control links'],
    tags: ['pure', 'applied'],
  },
  {
    id: 'partial-differential-equations',
    name: 'PDE',
    family: 'Change and Limit',
    x: 2760,
    y: 1210,
    width: 330,
    height: 235,
    color: '#f4a261',
    accent: '#703900',
    eraId: 'rigor',
    description: 'Equations involving partial derivatives, modeling waves, heat, fluids, geometry, fields, and constraints.',
    topics: ['Heat equation', 'Wave equation', 'Laplace equation', 'Navier-Stokes equations', 'Weak solutions', 'Sobolev spaces'],
    tags: ['pure', 'applied'],
  },
  {
    id: 'harmonic-analysis',
    name: 'Harmonic Analysis',
    family: 'Change and Limit',
    x: 2400,
    y: 1580,
    width: 345,
    height: 235,
    color: '#ffd6a5',
    accent: '#7b4a12',
    eraId: 'modern',
    description: 'Decomposing functions and signals into frequencies using Fourier analysis, singular integrals, and groups.',
    topics: ['Fourier transform', 'Convolution', 'Singular integrals', 'Littlewood-Paley theory', 'Wavelets', 'Representation links'],
    tags: ['pure', 'applied', 'computational'],
  },
  {
    id: 'lie-theory',
    name: 'Lie Theory',
    family: 'Pure',
    x: 2420,
    y: 850,
    width: 335,
    height: 235,
    color: '#e4c1f9',
    accent: '#63327f',
    eraId: 'rigor',
    description: 'Continuous symmetry through Lie groups, Lie algebras, representations, roots, and geometric actions.',
    topics: ['Lie groups', 'Lie algebras', 'Exponential map', 'Root systems', 'Semisimple Lie algebras', 'Representation of Lie groups'],
    tags: ['pure', 'applied'],
  },
  {
    id: 'probabilistic-method',
    name: 'Probabilistic Method',
    family: 'Discrete Structures',
    x: 2765,
    y: 1580,
    width: 350,
    height: 235,
    color: '#98f5e1',
    accent: '#0b695b',
    eraId: 'modern',
    description: 'Using randomness to prove deterministic existence theorems in combinatorics, graphs, number theory, and CS.',
    topics: ['Random graphs', 'Lovasz local lemma', 'Concentration inequalities', 'Second moment method', 'Derandomization', 'Expander graphs'],
    tags: ['pure', 'computational'],
  },
  {
    id: 'machine-learning-theory',
    name: 'ML Theory',
    family: 'Computation',
    x: 2610,
    y: 1940,
    width: 345,
    height: 235,
    color: '#a7c957',
    accent: '#3e5f20',
    eraId: 'contemporary',
    description: 'Mathematical study of learning algorithms, generalization, optimization, statistical risk, and representation.',
    topics: ['PAC learning', 'VC dimension', 'Kernel methods', 'Generalization bounds', 'Neural tangent kernel', 'Online learning'],
    tags: ['applied', 'computational'],
  },
  {
    id: 'proof-assistants',
    name: 'Proof Assistants',
    family: 'Foundational',
    x: 1560,
    y: 180,
    width: 320,
    height: 220,
    color: '#b9fbc0',
    accent: '#22733a',
    eraId: 'contemporary',
    description: 'Computer-checked formal proof using type theory, tactics, libraries, and verified mathematical structures.',
    topics: ['Type theory', 'Dependent types', 'Lean', 'Coq', 'Formalized mathematics', 'Automated theorem proving'],
    tags: ['foundational', 'computational'],
  },
  {
    id: 'history-of-math',
    name: 'History of Math',
    family: 'Historical',
    x: 1910,
    y: 180,
    width: 330,
    height: 220,
    color: '#fdffb6',
    accent: '#706d00',
    eraId: 'ancient',
    description: 'The changing institutions, notations, cultures, problems, and biographies that shaped mathematical ideas.',
    topics: ['Babylonian mathematics', 'Greek deductive mathematics', 'Chinese mathematics', 'Islamic algebra', 'Renaissance algebra', 'Bourbaki'],
    tags: ['historical'],
  },
  {
    id: 'math-education',
    name: 'Math Education',
    family: 'Applied',
    x: 2300,
    y: 180,
    width: 325,
    height: 220,
    color: '#d0f4de',
    accent: '#1d6e3c',
    eraId: 'contemporary',
    description: 'Learning progressions, representations, proof development, curriculum, assessment, and mathematical cognition.',
    topics: ['Conceptual understanding', 'Proof pedagogy', 'Representation fluency', 'Mathematical modeling', 'Assessment design', 'Learning progressions'],
    tags: ['applied', 'historical'],
  },
  {
    id: 'operations-research',
    name: 'Operations Research',
    family: 'Decision',
    x: 2630,
    y: 2310,
    width: 350,
    height: 235,
    color: '#caf0f8',
    accent: '#006073',
    eraId: 'modern',
    description: 'Mathematical modeling for logistics, scheduling, queues, inventory, decisions, simulation, and resource allocation.',
    topics: ['Queueing theory', 'Scheduling', 'Network optimization', 'Inventory models', 'Simulation', 'Decision analysis'],
    tags: ['applied', 'computational'],
  },
  {
    id: 'mathematical-logic-cs',
    name: 'Logic in CS',
    family: 'Computation',
    x: 1920,
    y: 860,
    width: 335,
    height: 235,
    color: '#ffc6ff',
    accent: '#7b337b',
    eraId: 'modern',
    description: 'Logic used for verification, semantics, databases, type systems, model checking, and program correctness.',
    topics: ['Temporal logic', 'Model checking', 'Hoare logic', 'Type systems', 'Database theory', 'Satisfiability'],
    tags: ['foundational', 'computational'],
  },
];

const difficultyCycle: Difficulty[] = [
  'beginner',
  'intermediate',
  'advanced',
  'graduate',
  'research',
  'advanced',
];

const doodles = ['sum', 'spiral', 'grid', 'curve', 'nodes', 'wave', 'cube', 'tree'];

const topicExtras: Record<string, Partial<Topic>> = {
  'calculus:limits': {
    overview:
      'A limit describes how the values of a function or sequence behave as the input gets arbitrarily close to some point (or infinity), without necessarily ever reaching it. It is the concept that makes the rest of calculus rigorous: continuity, the derivative, the integral, and the convergence of infinite series are all defined as limits.',
    formal:
      'For a function $f$ defined near $a$ (though not necessarily at $a$), $\\lim_{x\\to a} f(x) = L$ means: for every $\\varepsilon>0$ there exists $\\delta>0$ such that whenever $0<|x-a|<\\delta$, we have $|f(x)-L|<\\varepsilon$. The analogous definition for a sequence $(a_n)$ converging to $L$ replaces the condition on $x$ with: for every $\\varepsilon>0$ there exists $N\\in\\mathbb{N}$ such that $n>N$ implies $|a_n-L|<\\varepsilon$.',
    keyIdeas: [
      'epsilon-delta rigor replacing informal talk of "infinitely small" quantities',
      'one-sided limits, limits at infinity, and infinite limits',
      'limit laws for sums, products, quotients, and composition',
      'the precise link between limits and continuity',
    ],
    whyItMatters:
      'Limits let mathematicians replace vague 17th-century talk of infinitesimals with a checkable, quantifier-based criterion. Every later definition in analysis — continuity, the derivative as a limit of difference quotients, the integral as a limit of Riemann sums, and the convergence of a series — is stated in terms of limits, so getting this one definition exactly right is what separates classical calculus from rigorous analysis.',
    prerequisites: [],
    related: ['calculus:derivatives', 'calculus:integrals', 'real-analysis:epsilon-delta-limits'],
    historicalContext:
      "Newton and Leibniz's original calculus (1660s-1680s) relied on infinitesimals and fluxions: quantities treated as nonzero yet smaller than any real number, a notion the philosopher George Berkeley mocked in The Analyst (1734) as the 'ghosts of departed quantities.' Bernard Bolzano (1817) and Augustin-Louis Cauchy (Cours d'Analyse, 1821) began replacing infinitesimal talk with limit language; Cauchy introduced the symbols epsilon and delta but never pinned down delta as a function of epsilon. Karl Weierstrass's Berlin lectures from 1861 onward fixed the epsilon-delta formulation used today, completing what historians call the arithmetization of analysis.",
    contributorIds: [
      'person:isaac-newton',
      'person:gottfried-wilhelm-leibniz',
      'person:bernard-bolzano',
      'person:augustin-louis-cauchy',
      'person:karl-weierstrass',
    ],
    workIds: ['work:cours-danalyse'],
    exampleProblems: [
      'Using the epsilon-delta definition, prove that $\\lim_{x\\to 2}(3x-1)=5$.',
      'Show that $\\lim_{x\\to 0}\\sin(1/x)$ does not exist, but $\\lim_{x\\to 0} x\\sin(1/x)=0$.',
      'Explain why $\\lim_{x\\to a} f(x)$ can exist even when $f(a)$ is undefined, and give an example.',
    ],
    applications: [
      'error bounds for numerical algorithms',
      'the rigorous foundation of continuity and differentiability',
      'asymptotic analysis of algorithm running time',
    ],
    researchDirections: [
      'nonstandard analysis and hyperreal formalizations of infinitesimals (Abraham Robinson)',
      'limits in more general topological structures via nets and filters',
      'machine-checked, formally verified epsilon-delta proofs in proof assistants',
    ],
    textbooks: [
      {
        title: 'Calculus',
        authors: ['Michael Spivak'],
        edition: '4th',
        year: 2008,
        why: 'Builds single-variable calculus from the epsilon-delta definition of limit with full proofs throughout; widely regarded as the standard for a rigorous first course.',
      },
      {
        title: 'Calculus',
        authors: ['Tom M. Apostol'],
        edition: '2nd',
        year: 1967,
        why: "Develops limits axiomatically alongside linear algebra and set theory; used in MIT's and Caltech's more rigorous introductory sequences.",
      },
      {
        title: 'Understanding Analysis',
        authors: ['Stephen Abbott'],
        edition: '2nd',
        year: 2015,
        why: 'A widely recommended bridge text that motivates the epsilon-delta definition historically (via the failures of naive limit reasoning) before formalizing it.',
      },
    ],
    keyFormulas: [
      { label: 'Epsilon-delta limit of a function', latex: '\\forall \\varepsilon>0\\,\\exists \\delta>0:\\ 0<|x-a|<\\delta \\implies |f(x)-L|<\\varepsilon' },
      { label: 'Limit of a sequence', latex: '\\forall \\varepsilon>0\\,\\exists N\\in\\mathbb{N}:\\ n>N \\implies |a_n-L|<\\varepsilon' },
    ],
    externalRefs: [
      { label: 'Encyclopedia of Mathematics: Limit', url: 'https://encyclopediaofmath.org/wiki/Limit', kind: 'encyclopedia' },
      { label: 'MacTutor: The rise of calculus', url: 'https://mathshistory.st-andrews.ac.uk/HistTopics/The_rise_of_calculus/', kind: 'reference' },
      { label: 'Wikipedia: Limit of a function', url: 'https://en.wikipedia.org/wiki/Limit_of_a_function', kind: 'encyclopedia' },
    ],
  },
  'calculus:derivatives': {
    overview:
      "The derivative of a function measures its instantaneous rate of change — equivalently, the slope of the tangent line to its graph at a point — and is defined as the limit of average rates of change (difference quotients) as the interval over which they're measured shrinks to zero.",
    formal:
      "For $f:\\mathbb{R}\\to\\mathbb{R}$, the derivative at $a$ is $f'(a)=\\lim_{h\\to 0}\\dfrac{f(a+h)-f(a)}{h}$, when this limit exists. Equivalently, $f$ is differentiable at $a$ with derivative $m$ if $f(a+h)=f(a)+mh+o(h)$ as $h\\to 0$ — the function is well approximated near $a$ by its tangent line.",
    keyIdeas: [
      'instantaneous rate of change and the slope of the tangent line',
      'differentiability as local linear approximation',
      'differentiability implies continuity, but not conversely (e.g. $|x|$ at $0$)',
      'the product, quotient, and chain rules',
      'derivatives as the basic tool for optimization',
    ],
    whyItMatters:
      "The derivative is the mathematical language for 'rate of change,' which is why it appears the moment a quantity varies: velocity as the derivative of position, marginal cost in economics, or the slope of a loss function in machine learning. It also converts optimization (finding the best value of something) into algebra: setting $f'(x)=0$ and solving.",
    prerequisites: ['calculus:limits'],
    related: ['calculus:integrals', 'calculus:taylor-series', 'calculus:multivariable-calculus'],
    historicalContext:
      "Newton's fluxions (rates of flow, described in De Methodis Serierum et Fluxionum, written 1671) and Leibniz's differential notation $dy/dx$ (1684) both captured the derivative independently, sparking a bitter priority dispute between England and the continent. Leibniz's notation ultimately won wider adoption because it generalizes cleanly to higher derivatives and the chain rule, while the rigorous limit-based definition used today came a century and a half later from Cauchy and Weierstrass.",
    contributorIds: ['person:isaac-newton', 'person:gottfried-wilhelm-leibniz', 'person:augustin-louis-cauchy'],
    workIds: ['work:cours-danalyse'],
    exampleProblems: [
      'Use the limit definition of the derivative to compute $f\'(x)$ for $f(x)=x^2$.',
      'Give an example of a function that is continuous everywhere but differentiable nowhere (the Weierstrass function).',
      'Derive the product rule $(fg)\'=f\'g+fg\'$ directly from the limit definition of the derivative.',
    ],
    applications: [
      'optimization: locating maxima and minima via critical points',
      'physics: velocity and acceleration as the first and second derivatives of position',
      "related-rates problems in engineering",
      "Newton's method for numerically finding roots of equations",
    ],
    researchDirections: [
      'generalized derivatives for non-smooth or fractal functions (the Weierstrass function, fractional calculus)',
      'automatic differentiation as the computational backbone of machine learning',
      'weak derivatives of distributions underlying modern PDE theory',
    ],
    textbooks: [
      {
        title: 'Calculus',
        authors: ['Michael Spivak'],
        edition: '4th',
        year: 2008,
        why: 'Derives every differentiation rule from the epsilon-delta definition, including a full treatment of the derivative as a best linear approximation.',
      },
      {
        title: 'Calculus: Early Transcendentals',
        authors: ['James Stewart'],
        edition: '9th',
        year: 2020,
        why: 'The most widely adopted introductory calculus textbook in North America, with extensive computational practice on differentiation rules and applied optimization/related-rates problems.',
      },
      {
        title: 'Introduction to Calculus and Analysis, Vol. I',
        authors: ['Richard Courant', 'Fritz John'],
        edition: '1989 reprint',
        year: 1965,
        why: 'A classic that blends computational fluency with genuine rigor and historical motivation, long used as a bridge between engineering-style and pure calculus courses.',
      },
    ],
    keyFormulas: [
      { label: 'Difference-quotient definition', latex: "f'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}" },
      { label: 'Power rule', latex: '\\frac{d}{dx}x^n = n x^{n-1}' },
      { label: 'Product rule', latex: "(fg)'=f'g+fg'" },
      { label: 'Chain rule', latex: "(f\\circ g)'(x)=f'(g(x))\\,g'(x)" },
    ],
    externalRefs: [
      { label: 'Encyclopedia of Mathematics: Derivative', url: 'https://encyclopediaofmath.org/wiki/Derivative', kind: 'encyclopedia' },
      { label: 'MacTutor: The rise of calculus', url: 'https://mathshistory.st-andrews.ac.uk/HistTopics/The_rise_of_calculus/', kind: 'reference' },
      { label: 'Wikipedia: Derivative', url: 'https://en.wikipedia.org/wiki/Derivative', kind: 'encyclopedia' },
    ],
  },
  'calculus:integrals': {
    overview:
      'The integral formalizes accumulation and area: the definite integral of a function over an interval is the signed area between its graph and the horizontal axis, computed as a limit of Riemann sums. The Fundamental Theorem of Calculus shows that integration and differentiation are inverse operations, unifying what had been two separate ancient problems (finding areas and finding tangents).',
    formal:
      'The definite integral $\\int_a^b f(x)\\,dx$ is the limit of Riemann sums $\\sum_{i=1}^n f(x_i^*)\\,\\Delta x_i$ as the mesh of a partition of $[a,b]$ goes to $0$. The Fundamental Theorem of Calculus states that if $F\'=f$ on $[a,b]$ then $\\int_a^b f(x)\\,dx=F(b)-F(a)$, and conversely that $\\frac{d}{dx}\\int_a^x f(t)\\,dt=f(x)$ at every point where $f$ is continuous.',
    keyIdeas: [
      'Riemann sums and area under a curve',
      'the Fundamental Theorem of Calculus linking derivatives and integrals',
      'indefinite integrals (antiderivatives) versus definite integrals',
      'integration techniques: substitution, integration by parts, partial fractions',
    ],
    whyItMatters:
      'Integration is how continuous accumulation is computed exactly rather than approximated: total distance from velocity, total work from force, total probability from a density function. The Fundamental Theorem of Calculus is one of the most consequential theorems in mathematics because it turns integration, an inherently limiting/summing process, into an algebraic problem of finding antiderivatives.',
    prerequisites: ['calculus:limits', 'calculus:derivatives'],
    related: ['calculus:derivatives', 'differential-equations:ordinary-differential-equations', 'real-analysis:lebesgue-integration'],
    historicalContext:
      "Ancient antecedents go back to Eudoxus's method of exhaustion and Archimedes's quadrature of the parabola; Bonaventura Cavalieri's method of indivisibles (1635) and Fermat's area calculations set the stage in the 17th century. Newton and Leibniz's decisive insight, reached independently around 1665-1675, was that integration (area) and differentiation (tangents) are inverse processes — the Fundamental Theorem of Calculus. Riemann's 1854 habilitation lecture gave the first rigorous sum-based definition of the definite integral, later generalized by Lebesgue in 1902 to a measure-theoretic integral that handles far more functions.",
    contributorIds: ['person:isaac-newton', 'person:gottfried-wilhelm-leibniz', 'person:augustin-louis-cauchy', 'person:bernhard-riemann'],
    workIds: ['work:cours-danalyse'],
    exampleProblems: [
      'Use Riemann sums directly from the definition to compute $\\int_0^1 x^2\\,dx$.',
      'Evaluate $\\int x e^x\\,dx$ using integration by parts.',
      'Explain why the Dirichlet function (1 on rationals, 0 on irrationals) is Lebesgue integrable but not Riemann integrable.',
    ],
    applications: [
      'computing areas, volumes, and arc length',
      'work and center-of-mass problems in physics and engineering',
      'probability: integrating a density function to get a probability',
      'numerical integration (quadrature) in scientific computing',
    ],
    researchDirections: [
      'Lebesgue and Henstock-Kurzweil integration theory for pathological functions',
      'high-dimensional numerical quadrature (Monte Carlo and quasi-Monte Carlo methods)',
      "stochastic integration (Ito calculus) underlying modern probability and mathematical finance",
    ],
    textbooks: [
      {
        title: 'Calculus',
        authors: ['Michael Spivak'],
        edition: '4th',
        year: 2008,
        why: 'Proves the Fundamental Theorem of Calculus rigorously from Riemann sums rather than asserting it, which most computational calculus texts skip.',
      },
      {
        title: 'Calculus: Early Transcendentals',
        authors: ['James Stewart'],
        edition: '9th',
        year: 2020,
        why: 'The standard source for integration technique practice (substitution, parts, partial fractions, improper integrals) used in most North American courses.',
      },
      {
        title: 'Introduction to Calculus and Analysis, Vol. I',
        authors: ['Richard Courant', 'Fritz John'],
        edition: '1989 reprint',
        year: 1965,
        why: 'Presents the Riemann integral with the same rigor Courant himself championed, alongside strong physical motivation for why integration matters.',
      },
    ],
    keyFormulas: [
      { label: 'Riemann sum definition', latex: '\\int_a^b f(x)\\,dx=\\lim_{\\|P\\|\\to 0}\\sum_{i=1}^n f(x_i^*)\\,\\Delta x_i' },
      { label: 'Fundamental Theorem of Calculus (evaluation form)', latex: '\\int_a^b f\'(x)\\,dx=f(b)-f(a)' },
      { label: 'Fundamental Theorem of Calculus (differentiation form)', latex: '\\frac{d}{dx}\\int_a^x f(t)\\,dt=f(x)' },
    ],
    externalRefs: [
      { label: 'Encyclopedia of Mathematics: Integral', url: 'https://encyclopediaofmath.org/wiki/Integral', kind: 'encyclopedia' },
      { label: 'MacTutor: The rise of calculus', url: 'https://mathshistory.st-andrews.ac.uk/HistTopics/The_rise_of_calculus/', kind: 'reference' },
      { label: 'Wikipedia: Fundamental theorem of calculus', url: 'https://en.wikipedia.org/wiki/Fundamental_theorem_of_calculus', kind: 'encyclopedia' },
    ],
  },
  'calculus:taylor-series': {
    overview:
      'A Taylor series approximates a function near a point by an infinite polynomial built from its derivatives at that point. It lets a transcendental function like $\\sin x$ or $e^x$ be studied, computed, and bounded using nothing but polynomial algebra.',
    formal:
      'If $f$ is infinitely differentiable near $x_0$, its Taylor series is $\\sum_{n=0}^{\\infty}\\dfrac{f^{(n)}(x_0)}{n!}(x-x_0)^n$. Taylor\'s theorem with remainder states $f(x)=\\sum_{k=0}^{N}\\dfrac{f^{(k)}(x_0)}{k!}(x-x_0)^k+R_N(x)$, where the Lagrange form of the remainder is $R_N(x)=\\dfrac{f^{(N+1)}(\\xi)}{(N+1)!}(x-x_0)^{N+1}$ for some $\\xi$ strictly between $x_0$ and $x$. Crucially, infinite differentiability alone does not guarantee the series converges to $f$: the function $f(x)=e^{-1/x^2}$ (with $f(0)=0$) is smooth everywhere, but its Taylor series at $x_0=0$ is identically zero.',
    keyIdeas: [
      'local polynomial approximation of a function',
      "Taylor's theorem and the Lagrange remainder as an explicit error bound",
      'radius and interval of convergence of a power series',
      'the Maclaurin series as the special case $x_0=0$',
      'analytic functions (equal to their own Taylor series) versus merely smooth ones',
    ],
    whyItMatters:
      "Taylor series let you replace a complicated function locally with a polynomial you can add, differentiate, and integrate term by term — this is literally how calculators and computers evaluate $\\sin$, $\\cos$, and $e^x$. They are also the bridge from real calculus into complex analysis, where being equal to a convergent Taylor series (being 'analytic') turns out to be equivalent to being complex-differentiable even once, an extraordinarily strong structural fact with no real-variable analogue.",
    prerequisites: ['calculus:derivatives'],
    related: ['calculus:integrals', 'analysis:sequences-and-series', 'complex-analysis:holomorphic-functions'],
    historicalContext:
      "Brook Taylor published the general series in Methodus Incrementorum Directa et Inversa (1715), building on special cases already known to James Gregory and Isaac Newton. Colin Maclaurin popularized the $x_0=0$ case in his Treatise of Fluxions (1742), which is why that special case still carries his name rather than Taylor's. The subtlety that infinite differentiability doesn't imply convergence to the function — illustrated by examples studied by Cauchy in the 1820s — wasn't fully appreciated until 19th-century analysis demanded rigorous convergence proofs rather than formal manipulation of series.",
    contributorIds: ['person:brook-taylor', 'person:leonhard-euler'],
    workIds: ['work:introductio-in-analysin-infinitorum'],
    exampleProblems: [
      'Compute the Maclaurin series for $e^x$, $\\sin x$, and $\\cos x$, and use them to verify Euler\'s formula $e^{ix}=\\cos x+i\\sin x$ term by term.',
      'Find the radius of convergence of the Taylor series of $f(x)=\\dfrac{1}{1+x^2}$ about $x_0=0$, and explain why it is finite even though $f$ is smooth on all of $\\mathbb{R}$.',
      'Use the Lagrange remainder to bound the error in approximating $\\sin(0.1)$ by its degree-3 Taylor polynomial.',
    ],
    applications: [
      'numerical approximation of transcendental functions in software and calculators',
      'error analysis and asymptotic expansions in applied mathematics',
      'linearization in physics and engineering (e.g. the small-angle approximation $\\sin\\theta\\approx\\theta$)',
      'generating functions in combinatorics, which are formal Taylor series in disguise',
    ],
    researchDirections: [
      'divergent and asymptotic series methods (Borel summation)',
      'multivariate Taylor and Fréchet expansions in infinite-dimensional spaces',
      'formal power series and generating-function methods in enumerative combinatorics',
    ],
    textbooks: [
      {
        title: 'Calculus',
        authors: ['Michael Spivak'],
        edition: '4th',
        year: 2008,
        why: "Gives a full, careful proof of Taylor's theorem with remainder and discusses convergence issues that most calculus texts gloss over.",
      },
      {
        title: 'Calculus',
        authors: ['Tom M. Apostol'],
        edition: '2nd',
        year: 1967,
        why: "Treats Taylor's theorem via both the Lagrange and integral forms of the remainder with full proofs, alongside power series convergence tests.",
      },
      {
        title: 'Introduction to Calculus and Analysis, Vol. I',
        authors: ['Richard Courant', 'Fritz John'],
        edition: '1989 reprint',
        year: 1965,
        why: 'Pairs the Taylor expansion with strong geometric and physical intuition for why polynomial approximation works.',
      },
    ],
    keyFormulas: [
      { label: 'Taylor series', latex: 'f(x)=\\sum_{n=0}^{\\infty}\\frac{f^{(n)}(x_0)}{n!}(x-x_0)^n' },
      { label: 'Lagrange remainder', latex: 'R_N(x)=\\frac{f^{(N+1)}(\\xi)}{(N+1)!}(x-x_0)^{N+1}' },
      { label: 'Maclaurin series of e^x', latex: 'e^x=\\sum_{n=0}^{\\infty}\\frac{x^n}{n!}' },
    ],
    externalRefs: [
      { label: 'Encyclopedia of Mathematics: Taylor series', url: 'https://encyclopediaofmath.org/wiki/Taylor_series', kind: 'encyclopedia' },
      { label: 'MacTutor: The rise of calculus', url: 'https://mathshistory.st-andrews.ac.uk/HistTopics/The_rise_of_calculus/', kind: 'reference' },
      { label: 'Wikipedia: Taylor series', url: 'https://en.wikipedia.org/wiki/Taylor_series', kind: 'encyclopedia' },
    ],
  },
  'calculus:multivariable-calculus': {
    overview:
      'Multivariable calculus extends limits, derivatives, and integrals to functions of several variables: partial derivatives measure change along each coordinate direction, the gradient packages them into a vector pointing toward steepest ascent, and multiple integrals compute volumes and higher-dimensional accumulation.',
    formal:
      'For $f:\\mathbb{R}^n\\to\\mathbb{R}$, $f$ is (Fréchet) differentiable at $\\mathbf{a}$ if there is a linear map, represented by the gradient $\\nabla f(\\mathbf{a})$, with $f(\\mathbf{a}+\\mathbf{h})=f(\\mathbf{a})+\\nabla f(\\mathbf{a})\\cdot\\mathbf{h}+o(\\|\\mathbf{h}\\|)$ as $\\mathbf{h}\\to 0$. The mere existence of all partial derivatives does not imply differentiability, but continuity of the partial derivatives near $\\mathbf{a}$ does (the $C^1$ criterion). For constrained optimization, the method of Lagrange multipliers says that at an extremum of $f$ subject to $g(\\mathbf{x})=0$, $\\nabla f(\\mathbf{x})=\\lambda\\,\\nabla g(\\mathbf{x})$ for some scalar $\\lambda$.',
    keyIdeas: [
      'partial derivatives and the gradient vector',
      'the total derivative as the best linear approximation to a multivariable function',
      'the Jacobian matrix and the multivariable chain rule',
      'multiple integrals and change of variables via the Jacobian determinant',
      'Lagrange multipliers for optimization under constraints',
    ],
    whyItMatters:
      'Almost all of physics, engineering, economics, and modern machine learning is phrased in terms of functions of several variables, and gradient-based optimization — following $-\\nabla f$ downhill — is the direct descendant of multivariable calculus that underlies training neural networks.',
    prerequisites: ['calculus:derivatives', 'calculus:integrals', 'linear-algebra:vector-spaces'],
    related: ['calculus:vector-calculus', 'differential-geometry:tangent-spaces', 'optimization:gradient-descent'],
    historicalContext:
      "Euler and Lagrange developed partial differentiation and multivariable calculus through the 18th century while formalizing mechanics; Lagrange's Mécanique Analytique (1788) introduced the method of Lagrange multipliers for constrained extrema. Carl Jacobi's work on determinants built from partial derivatives — the Jacobian, from the 1830s-40s — made rigorous change of variables in multiple integrals, and it now carries his name.",
    contributorIds: ['person:leonhard-euler', 'person:joseph-louis-lagrange'],
    workIds: [],
    exampleProblems: [
      'Find and classify the critical points of $f(x,y)=x^3-3xy^2$ using the second-derivative (Hessian) test.',
      'Use Lagrange multipliers to find the extrema of $f(x,y)=xy$ subject to the constraint $x^2+y^2=1$.',
      'Evaluate $\\iint_D e^{-(x^2+y^2)}\\,dA$ over the plane by converting to polar coordinates.',
    ],
    applications: [
      'gradient descent and backpropagation in machine learning',
      'constrained utility and profit maximization in economics',
      'partial derivatives of thermodynamic state functions',
      'surface normals and shading via gradients in computer graphics',
    ],
    researchDirections: [
      'differentiability and optimization theory in infinite-dimensional (Banach and Hilbert) spaces',
      'automatic differentiation for large-scale, high-dimensional machine learning models',
      'optimal transport and multivariate change-of-variables formulas in probability',
    ],
    textbooks: [
      {
        title: 'Vector Calculus',
        authors: ['Jerrold E. Marsden', 'Anthony Tromba'],
        edition: '6th',
        year: 2012,
        why: 'The standard university text for multivariable and vector calculus, balancing rigorous statements (inverse and implicit function theorems) with extensively worked applications.',
      },
      {
        title: 'Calculus: Early Transcendentals',
        authors: ['James Stewart'],
        edition: '9th',
        year: 2020,
        why: 'Its later chapters are the most common introduction to partial derivatives, multiple integrals, and Lagrange multipliers in US undergraduate courses.',
      },
      {
        title: 'Vector Calculus',
        authors: ['Susan Jane Colley'],
        edition: '4th',
        year: 2011,
        why: 'A frequently recommended alternative with a clean, example-driven treatment of the gradient, Lagrange multipliers, and multiple integrals.',
      },
    ],
    keyFormulas: [
      { label: 'Total (Fréchet) derivative', latex: 'f(\\mathbf{a}+\\mathbf{h})=f(\\mathbf{a})+\\nabla f(\\mathbf{a})\\cdot\\mathbf{h}+o(\\|\\mathbf{h}\\|)' },
      { label: 'Lagrange multiplier condition', latex: '\\nabla f(\\mathbf{x})=\\lambda\\,\\nabla g(\\mathbf{x})' },
      { label: 'Change of variables (Jacobian)', latex: "\\iint_{D} f\\,dA=\\iint_{D'} f(\\mathbf{x}(u,v))\\,\\left|\\det\\frac{\\partial(x,y)}{\\partial(u,v)}\\right|\\,du\\,dv" },
    ],
    externalRefs: [
      { label: 'Wikipedia: Multivariable calculus', url: 'https://en.wikipedia.org/wiki/Multivariable_calculus', kind: 'encyclopedia' },
      { label: 'Wikipedia: Lagrange multiplier', url: 'https://en.wikipedia.org/wiki/Lagrange_multiplier', kind: 'encyclopedia' },
      { label: 'MacTutor: search for Lagrange', url: 'https://mathshistory.st-andrews.ac.uk/Search/?query=Lagrange', kind: 'reference' },
    ],
  },
  'calculus:vector-calculus': {
    overview:
      "Vector calculus studies vector fields — assignments of a vector to every point in space — through the gradient, divergence, and curl, and through line and surface integrals. Its central results, Green's theorem, Stokes' theorem, and the divergence theorem, are all higher-dimensional versions of the Fundamental Theorem of Calculus.",
    formal:
      'For a vector field $\\mathbf{F}=(F_1,F_2,F_3)$, the divergence is $\\nabla\\cdot\\mathbf{F}=\\frac{\\partial F_1}{\\partial x}+\\frac{\\partial F_2}{\\partial y}+\\frac{\\partial F_3}{\\partial z}$ and the curl is $\\nabla\\times\\mathbf{F}$. Green\'s theorem relates a line integral around a plane curve $C$ to a double integral over the region $D$ it encloses: $\\oint_C(P\\,dx+Q\\,dy)=\\iint_D\\left(\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}\\right)dA$. Stokes\' theorem relates the surface integral of $\\nabla\\times\\mathbf{F}$ over a surface $S$ to the line integral of $\\mathbf{F}$ around its boundary curve, and the divergence theorem relates the flux of $\\mathbf{F}$ through a closed surface to the volume integral of $\\nabla\\cdot\\mathbf{F}$ inside it. All three are special cases of the general Stokes\' theorem for differential forms, $\\int_M d\\omega=\\int_{\\partial M}\\omega$.',
    keyIdeas: [
      'the gradient, divergence, and curl operators',
      'line integrals and surface integrals',
      "Green's, Stokes', and the divergence theorem as instances of one underlying theorem",
      'conservative vector fields and path independence',
      'connections to fluid flow and electromagnetism',
    ],
    whyItMatters:
      "Maxwell's equations of electromagnetism and the Navier-Stokes equations of fluid dynamics are written natively in the language of divergence and curl. The unifying generalized Stokes' theorem — that integrating a derivative over a region equals integrating the original quantity over its boundary — is one of the central organizing facts of modern differential geometry and mathematical physics.",
    prerequisites: ['calculus:multivariable-calculus'],
    related: ['differential-geometry:smooth-manifolds', 'mathematical-physics:classical-mechanics', 'partial-differential-equations:heat-equation'],
    historicalContext:
      "George Green stated what is now called Green's theorem in a self-published 1828 essay on electricity and magnetism that went largely unnoticed for years. The divergence theorem was proved in special cases by Gauss (1813) and more generally by Mikhail Ostrogradsky (1826-1831). The result now called Stokes' theorem was first stated by Lord Kelvin in an 1850 letter to George Gabriel Stokes, who then set it as a prize examination question at Cambridge in 1854 — the theorem kept Stokes' name even though he did not discover it. Élie Cartan's theory of differential forms in the early 20th century revealed all three classical theorems as one single statement.",
    contributorIds: ['person:george-gabriel-stokes', 'person:carl-friedrich-gauss'],
    workIds: [],
    exampleProblems: [
      "Verify Green's theorem for $\\mathbf{F}=(-y,x)$ on the unit disk by computing both sides directly.",
      'Use the divergence theorem to compute the flux of $\\mathbf{F}=(x,y,z)$ through the unit sphere.',
      'Show that a vector field on a simply connected domain is conservative if and only if $\\nabla\\times\\mathbf{F}=\\mathbf{0}$.',
    ],
    applications: [
      "electromagnetism, where Maxwell's equations are stated in terms of divergence and curl",
      'fluid dynamics: mass and momentum conservation, and the Navier-Stokes equations',
      'computer graphics and geometry processing (flux and flow visualization)',
      'geophysics: modeling gravitational and magnetic fields',
    ],
    researchDirections: [
      "the generalized Stokes' theorem for differential forms on manifolds",
      'discrete exterior calculus for numerical PDE solvers and computer graphics',
      'de Rham cohomology as the topological obstruction to solving $\\nabla\\times\\mathbf{F}=\\mathbf{G}$ globally',
    ],
    textbooks: [
      {
        title: 'Vector Calculus',
        authors: ['Jerrold E. Marsden', 'Anthony Tromba'],
        edition: '6th',
        year: 2012,
        why: "Covers Green's, Stokes', and the divergence theorem with full proofs, and is the most commonly assigned dedicated vector calculus text at the undergraduate level.",
      },
      {
        title: 'Div, Grad, Curl, and All That: An Informal Text on Vector Calculus',
        authors: ['H. M. Schey'],
        edition: '4th',
        year: 2005,
        why: 'An informal, physically motivated treatment built entirely around electromagnetism; one of the most consistently recommended books for building genuine intuition for the vector operators.',
      },
      {
        title: 'Vector Calculus',
        authors: ['Susan Jane Colley'],
        edition: '4th',
        year: 2011,
        why: 'A clear, rigorous alternative that covers the same integral theorems at a slightly gentler pace than Marsden and Tromba.',
      },
    ],
    keyFormulas: [
      { label: "Green's theorem", latex: '\\oint_C(P\\,dx+Q\\,dy)=\\iint_D\\left(\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}\\right)dA' },
      { label: "Stokes' theorem", latex: '\\iint_S(\\nabla\\times\\mathbf{F})\\cdot d\\mathbf{S}=\\oint_{\\partial S}\\mathbf{F}\\cdot d\\mathbf{r}' },
      { label: 'Divergence theorem', latex: '\\iiint_V(\\nabla\\cdot\\mathbf{F})\\,dV=\\iint_{\\partial V}\\mathbf{F}\\cdot d\\mathbf{S}' },
    ],
    externalRefs: [
      { label: 'Encyclopedia of Mathematics: Stokes formula', url: 'https://encyclopediaofmath.org/wiki/Stokes_formula', kind: 'encyclopedia' },
      { label: 'Wikipedia: Vector calculus', url: 'https://en.wikipedia.org/wiki/Vector_calculus', kind: 'encyclopedia' },
      { label: 'Wikipedia: Divergence theorem', url: 'https://en.wikipedia.org/wiki/Divergence_theorem', kind: 'encyclopedia' },
    ],
  },
  'linear-algebra:vector-spaces': {
    overview:
      'A vector space is a collection of objects — "vectors" — that can be added to each other and scaled by numbers (scalars) from some field, in a way that behaves like ordinary arithmetic with arrows in the plane. The point of the axioms is that they capture exactly what $\\mathbb{R}^n$, polynomials, matrices, and function spaces all have in common, so any theorem proved from the axioms alone applies to all of them at once.',
    formal:
      'A vector space over a field $F$ is a set $V$ with an operation $+:V\\times V\\to V$ and a scalar multiplication $\\cdot:F\\times V\\to V$ such that $(V,+)$ is an abelian group with identity $0$, and for all $a,b\\in F$, $u,v\\in V$: $a(u+v)=au+av$, $(a+b)v=av+bv$, $(ab)v=a(bv)$, and $1v=v$. A finite subset $\\{v_1,\\dots,v_n\\}$ is a basis if it is linearly independent and spans $V$; the Steinitz exchange lemma shows every basis of a finite-dimensional $V$ has the same size, called $\\dim V$.',
    keyIdeas: [
      'linear combinations and span',
      'linear independence versus redundancy',
      'basis and the well-definedness of dimension (Steinitz exchange lemma)',
      'subspaces, direct sums $V=U\\oplus W$, and quotient spaces $V/U$',
      'the dual space $V^*$ of linear functionals on $V$',
    ],
    whyItMatters:
      "Vector spaces are the single most reused structure in mathematics: the axioms say nothing about what a 'vector' is, so the same theorems about span, independence, and dimension apply verbatim to arrows in $\\mathbb{R}^3$, to polynomials, to solution sets of linear differential equations, and to quantum states in a Hilbert space. This abstraction is what lets a single course in linear algebra pay off across analysis, physics, statistics, and computer science.",
    prerequisites: [],
    related: ['linear-algebra:matrices', 'abstract-algebra:field-theory', 'functional-analysis:normed-spaces'],
    historicalContext:
      "Hermann Grassmann's Die lineale Ausdehnungslehre (1844, revised 1862) gave the first abstract, coordinate-free calculus of $n$-dimensional 'extensive quantities,' including linear independence and dimension, but its idiosyncratic philosophical style meant it was barely read for decades. Giuseppe Peano gave the modern, explicit list of vector space axioms — for finite- and infinite-dimensional real spaces alike — in Calcolo Geometrico (1888), crediting Grassmann's ideas but restating them in the algebraic form still used today. Hermann Weyl's Space, Time, Matter (1918) and later Bourbaki's Éléments de mathématique cemented the axiomatic vector space as the standard starting point of linear algebra.",
    contributorIds: ['person:hermann-grassmann', 'person:giuseppe-peano'],
    workIds: ['work:die-lineale-ausdehnungslehre', 'work:linear-algebra-and-its-applications'],
    exampleProblems: [
      "Show that the set of solutions to the differential equation $y''+y=0$ forms a 2-dimensional real vector space, and exhibit a basis.",
      'Prove that any two bases of a finite-dimensional vector space have the same number of elements.',
      'Determine whether $1,\\,x,\\,x^2,\\,x^3$ form a basis for the vector space of real polynomials of degree at most 3.',
    ],
    applications: [
      'state spaces in quantum mechanics (Hilbert spaces)',
      'function spaces in signal processing and Fourier analysis',
      'feature spaces and embeddings in machine learning',
      'coordinate and transformation systems in computer graphics',
    ],
    researchDirections: [
      'infinite-dimensional and topological vector spaces in functional analysis',
      'representation theory: vector spaces equipped with a group action',
      'sparse and low-rank structure in high-dimensional vector spaces of data',
    ],
    textbooks: [
      {
        title: 'Linear Algebra Done Right',
        authors: ['Sheldon Axler'],
        edition: '4th',
        year: 2024,
        why: 'Builds linear algebra from vector spaces and linear maps rather than determinants, and is now a standard undergraduate text at many universities precisely for that conceptual approach.',
      },
      {
        title: 'Finite-Dimensional Vector Spaces',
        authors: ['Paul R. Halmos'],
        edition: '2nd',
        year: 1958,
        why: 'A famously clean, axiomatic exposition that shaped how generations of mathematicians think about vector spaces, bases, and duality.',
      },
      {
        title: 'Linear Algebra',
        authors: ['Kenneth Hoffman', 'Ray Kunze'],
        edition: '2nd',
        year: 1971,
        why: 'A rigorous, proof-first treatment of vector spaces over general fields, long used in more theoretical undergraduate and beginning graduate courses.',
      },
    ],
    keyFormulas: [
      { label: 'Vector space axioms (distributivity)', latex: 'a(u+v)=au+av,\\qquad (a+b)v=av+bv' },
      { label: 'Dimension of a direct sum', latex: '\\dim(U\\oplus W)=\\dim U+\\dim W' },
      { label: 'Dimension (rank-nullity precursor)', latex: '\\dim V = |\\{v_1,\\dots,v_n\\}| \\text{ for any basis of } V' },
    ],
    externalRefs: [
      { label: 'Encyclopedia of Mathematics: Vector space', url: 'https://encyclopediaofmath.org/wiki/Vector_space', kind: 'encyclopedia' },
      { label: 'MacTutor: Hermann Grassmann', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Grassmann/', kind: 'reference' },
      { label: 'MacTutor: Giuseppe Peano', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Peano/', kind: 'reference' },
    ],
  },
  'linear-algebra:matrices': {
    overview:
      'A matrix is a rectangular array of numbers that represents a linear map between finite-dimensional vector spaces once bases are chosen. Matrix addition and multiplication are defined precisely so that they mirror composing and combining linear maps, which is why matrix algebra, despite looking like a bookkeeping device, encodes the entire theory of linear transformations.',
    formal:
      'An $m\\times n$ matrix over a field $F$ is an array $A=(a_{ij})\\in F^{m\\times n}$. Given a linear map $T:V\\to W$ and ordered bases of $V$ and $W$, the matrix of $T$ is the array whose $j$-th column lists the coordinates of $T(v_j)$; composition of linear maps corresponds to matrix multiplication, $(AB)_{ik}=\\sum_j a_{ij}b_{jk}$, and this product is associative but in general not commutative.',
    keyIdeas: [
      'a matrix as the coordinate representation of a linear map',
      'matrix multiplication as composition of linear maps',
      'row reduction (Gaussian elimination) for solving linear systems',
      'rank, column space, and null space',
      'change of basis and similarity of matrices',
    ],
    whyItMatters:
      'Once a linear map is written as a matrix, abstract questions about vector spaces become concrete arithmetic that computers can execute: solving linear systems, fitting data by least squares, rotating a 3D model, or propagating signals through a neural network layer are all matrix multiplications. Matrix algebra is the computational engine that makes linear algebra practically useful, not just theoretically elegant.',
    prerequisites: ['linear-algebra:vector-spaces'],
    related: ['linear-algebra:determinants', 'linear-algebra:eigenvalues', 'numerical-analysis:numerical-linear-algebra'],
    historicalContext:
      'Systems of linear equations and array-based elimination methods go back to the Chinese text Jiuzhang Suanshu (Nine Chapters on the Mathematical Art, c. 200 BCE), which describes a counting-rod procedure equivalent to Gaussian elimination. The word and modern concept of a "matrix" as an algebraic object in its own right — separate from the determinant it could produce — was introduced by James Joseph Sylvester in 1850, and Arthur Cayley\'s A Memoir on the Theory of Matrices (1858) first defined matrix addition, multiplication, and inversion and proved the Cayley-Hamilton theorem for small cases, founding matrix algebra as a subject.',
    contributorIds: ['person:arthur-cayley', 'person:james-joseph-sylvester'],
    workIds: ['work:a-memoir-on-the-theory-of-matrices'],
    exampleProblems: [
      'Use Gaussian elimination to solve the system $x+2y-z=3,\\ 2x-y+3z=1,\\ 3x+y+2z=7$, or show it is inconsistent.',
      'Show that matrix multiplication is associative directly from the definition $(AB)_{ik}=\\sum_j a_{ij}b_{jk}$.',
      'Find the rank of $A=\\begin{pmatrix}1&2&1\\\\2&4&3\\\\3&6&4\\end{pmatrix}$ and describe its null space.',
    ],
    applications: [
      'solving linear systems in engineering and physics',
      'representing rotations, projections, and transformations in computer graphics',
      'weight matrices and layer computations in neural networks',
      'Markov transition matrices in probability and PageRank-style algorithms',
    ],
    researchDirections: [
      'randomized and communication-efficient algorithms for very large matrices',
      'structured and sparse matrix computations for large-scale scientific computing',
      'tensor generalizations of matrix decompositions for multiway data',
    ],
    textbooks: [
      {
        title: 'Introduction to Linear Algebra',
        authors: ['Gilbert Strang'],
        edition: '6th',
        year: 2023,
        why: "The text for MIT's 18.06 course and one of the most widely used linear algebra books worldwide, built around concrete matrix computation and its four fundamental subspaces.",
      },
      {
        title: 'Matrix Analysis',
        authors: ['Roger A. Horn', 'Charles R. Johnson'],
        edition: '2nd',
        year: 2012,
        why: 'The standard graduate reference for matrix theory: canonical forms, norms, and structural results, cited across pure and applied linear algebra.',
      },
      {
        title: 'Numerical Linear Algebra',
        authors: ['Lloyd N. Trefethen', 'David Bau III'],
        year: 1997,
        why: 'Reframes classical matrix algebra (factorizations, conditioning, elimination) from the algorithmic and numerical-stability perspective needed for real computation.',
      },
    ],
    keyFormulas: [
      { label: 'Matrix multiplication', latex: '(AB)_{ik}=\\sum_{j=1}^n a_{ij}b_{jk}' },
      { label: 'Rank-nullity theorem', latex: '\\operatorname{rank}(A)+\\dim(\\ker A)=n' },
      { label: 'Matrix inverse condition', latex: 'AA^{-1}=A^{-1}A=I \\iff \\det A\\neq 0' },
    ],
    externalRefs: [
      { label: 'Encyclopedia of Mathematics: Matrix algebra', url: 'https://encyclopediaofmath.org/wiki/Matrix_algebra', kind: 'encyclopedia' },
      { label: 'MacTutor: Matrices and determinants', url: 'https://mathshistory.st-andrews.ac.uk/HistTopics/Matrices_and_determinants/', kind: 'reference' },
      { label: 'MacTutor: James Joseph Sylvester', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Sylvester/', kind: 'reference' },
    ],
  },
  'linear-algebra:determinants': {
    overview:
      'The determinant is a single number computed from a square matrix that measures how the associated linear map scales volume and whether it reverses orientation. A matrix is invertible exactly when its determinant is nonzero, which makes the determinant a compact test for whether a linear system has a unique solution.',
    formal:
      'For an $n\\times n$ matrix $A=(a_{ij})$ over a commutative ring, $\\det A=\\sum_{\\sigma\\in S_n}\\operatorname{sgn}(\\sigma)\\prod_{i=1}^n a_{i,\\sigma(i)}$, summed over all permutations $\\sigma$ of $\\{1,\\dots,n\\}$. Equivalently, the determinant is the unique alternating multilinear function of the columns of $A$ normalized so $\\det I=1$; geometrically $|\\det A|$ is the volume of the parallelepiped spanned by the columns of $A$, and $\\det(AB)=\\det A\\det B$.',
    keyIdeas: [
      'the determinant as signed volume scaling factor',
      'multilinearity and alternation in the columns',
      'cofactor (Laplace) expansion and the adjugate formula for the inverse',
      "Cramer's rule for solving linear systems",
      'invertibility criterion: $A$ invertible iff $\\det A\\neq 0$',
    ],
    whyItMatters:
      "The determinant packages an enormous amount of linear-algebraic information — invertibility, orientation, volume distortion, and the characteristic polynomial used to find eigenvalues — into one scalar computed by a fixed formula, which is why it recurs everywhere from solving linear systems to the Jacobian in multivariable calculus's change-of-variables formula.",
    prerequisites: ['linear-algebra:matrices'],
    related: ['linear-algebra:eigenvalues', 'calculus:multivariable-calculus', 'abstract-algebra:ring-theory'],
    historicalContext:
      "Special cases of determinant-like elimination appear in Gerolamo Cardano's Ars Magna (1545) for 2x2 systems, and Seki Takakazu in Japan (1683) and Gottfried Wilhelm Leibniz in Europe (1693, in a letter to l'Hopital) independently gave early determinant-style formulas for eliminating variables from linear systems. Gabriel Cramer stated his eponymous rule in 1750, and Augustin-Louis Cauchy gave the first systematic, near-modern treatment — including the term 'determinant' in its current sense, the multiplication theorem $\\det(AB)=\\det A \\det B$, and the connection to alternating functions — in an 1812 memoir.",
    contributorIds: ['person:augustin-louis-cauchy', 'person:carl-friedrich-gauss'],
    workIds: ['work:a-memoir-on-the-theory-of-matrices'],
    exampleProblems: [
      'Compute $\\det\\begin{pmatrix}2&1&0\\\\1&3&1\\\\0&1&2\\end{pmatrix}$ by cofactor expansion and verify it with row reduction.',
      "Use Cramer's rule to solve $2x+y=5,\\ x-3y=-1$, and explain why the method fails when the coefficient determinant is zero.",
      'Prove that swapping two rows of a matrix negates its determinant, directly from the permutation-sum definition.',
    ],
    applications: [
      'testing invertibility of linear systems in engineering and physics',
      'the Jacobian determinant in multivariable change of variables and probability density transformations',
      'orientation and volume computations in computer graphics and computational geometry',
      'the characteristic polynomial used to compute eigenvalues',
    ],
    researchDirections: [
      'fast and numerically stable determinant and permanent computation for large matrices',
      'determinantal point processes in probability and statistical physics',
      'generalizations of the determinant to non-commutative and quantum settings (quasideterminants)',
    ],
    textbooks: [
      {
        title: 'Introduction to Linear Algebra',
        authors: ['Gilbert Strang'],
        edition: '6th',
        year: 2023,
        why: 'Presents the determinant through its defining properties (multilinear, alternating, normalized) alongside cofactor expansion and geometric volume interpretation.',
      },
      {
        title: 'Linear Algebra',
        authors: ['Kenneth Hoffman', 'Ray Kunze'],
        edition: '2nd',
        year: 1971,
        why: 'Gives a fully rigorous, axiomatic construction of the determinant as the unique alternating multilinear form, over an arbitrary field.',
      },
      {
        title: 'Matrix Analysis',
        authors: ['Roger A. Horn', 'Charles R. Johnson'],
        edition: '2nd',
        year: 2012,
        why: 'The standard reference for determinant identities, inequalities, and their role in matrix theory beyond the introductory course.',
      },
    ],
    keyFormulas: [
      { label: 'Leibniz formula', latex: '\\det A=\\sum_{\\sigma\\in S_n}\\operatorname{sgn}(\\sigma)\\prod_{i=1}^n a_{i,\\sigma(i)}' },
      { label: 'Multiplicativity', latex: '\\det(AB)=\\det A\\,\\det B' },
      { label: "Cramer's rule", latex: 'x_i=\\frac{\\det A_i}{\\det A}' },
    ],
    externalRefs: [
      { label: 'Encyclopedia of Mathematics: Determinant', url: 'https://encyclopediaofmath.org/wiki/Determinant', kind: 'encyclopedia' },
      { label: 'MacTutor: Matrices and determinants', url: 'https://mathshistory.st-andrews.ac.uk/HistTopics/Matrices_and_determinants/', kind: 'reference' },
      { label: 'MacTutor: Augustin-Louis Cauchy', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Cauchy/', kind: 'reference' },
    ],
  },
  'linear-algebra:eigenvalues': {
    overview:
      'An eigenvector of a linear map is a nonzero vector whose direction is left unchanged by the map — it is only stretched or shrunk by a scalar factor, its eigenvalue. Eigenvalues and eigenvectors reveal the "natural axes" of a linear transformation: directions along which its complicated action reduces to simple scalar multiplication.',
    formal:
      'For a linear operator $T:V\\to V$ (or matrix $A\\in F^{n\\times n}$), $\\lambda\\in F$ is an eigenvalue if there is a nonzero $v\\in V$ with $Tv=\\lambda v$; such $v$ is an eigenvector. Eigenvalues are exactly the roots of the characteristic polynomial $p(\\lambda)=\\det(A-\\lambda I)$. If $A$ has $n$ linearly independent eigenvectors, $A=PDP^{-1}$ where $D$ is diagonal with the eigenvalues on the diagonal and the columns of $P$ are the corresponding eigenvectors; the spectral theorem strengthens this to $A=Q\\Lambda Q^{T}$ with $Q$ orthogonal whenever $A$ is real symmetric.',
    keyIdeas: [
      'invariant directions (eigenvectors) and their scaling factors (eigenvalues)',
      'the characteristic polynomial $\\det(A-\\lambda I)$ and algebraic vs. geometric multiplicity',
      'diagonalizability and the Jordan normal form when a full eigenbasis fails to exist',
      'the spectral theorem for real symmetric / Hermitian matrices',
      'eigenvalues as steady-state or resonant modes of a linear dynamical system',
    ],
    whyItMatters:
      'Diagonalizing a matrix via its eigenvalues turns a coupled linear system into independent one-dimensional problems, which is why eigenvalues govern the long-run behavior of Markov chains, the stability of equilibria in dynamical systems, the vibration modes of a physical structure, and the principal components extracted from data.',
    prerequisites: ['linear-algebra:determinants'],
    related: ['linear-algebra:inner-product-spaces', 'dynamical-systems:fixed-points', 'linear-algebra:singular-value-decomposition'],
    historicalContext:
      "Euler and Lagrange encountered eigenvalue-like quantities in the 1740s-1770s while analyzing the principal axes of rotation of rigid bodies and secular perturbations in planetary orbits; Cauchy proved in 1829 that the eigenvalues (which he called 'racines caracteristiques') of a real symmetric matrix are always real, an early form of the spectral theorem, while studying quadratic forms and principal axes of ellipsoids of inertia. David Hilbert introduced the German term 'Eigenwert' around 1904 while extending the theory to infinite-dimensional integral operators, and Camille Jordan's 1870 canonical form theory resolved the case where a matrix cannot be diagonalized.",
    contributorIds: ['person:augustin-louis-cauchy', 'person:camille-jordan', 'person:david-hilbert'],
    workIds: ['work:a-memoir-on-the-theory-of-matrices'],
    exampleProblems: [
      'Find the eigenvalues and eigenvectors of $A=\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$ and diagonalize it.',
      'Show that $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$ has only one linearly independent eigenvector and so cannot be diagonalized; find its Jordan form.',
      'Prove that a real symmetric matrix has only real eigenvalues.',
    ],
    applications: [
      'principal component analysis for dimensionality reduction in data science',
      "Google's PageRank algorithm as the dominant eigenvector of a web-link matrix",
      'stability analysis of equilibria in dynamical systems and control theory',
      'vibration modes and resonant frequencies in mechanical and structural engineering',
    ],
    researchDirections: [
      'randomized and iterative eigenvalue algorithms for enormous sparse matrices',
      'spectral graph theory: eigenvalues of adjacency and Laplacian matrices as structural invariants',
      'spectral theory of operators on infinite-dimensional Hilbert spaces (quantum mechanics)',
    ],
    textbooks: [
      {
        title: 'Linear Algebra Done Right',
        authors: ['Sheldon Axler'],
        edition: '4th',
        year: 2024,
        why: 'Organizes the entire book around eigenvalues and eigenvectors of linear operators, reaching the spectral theorem without relying on determinants.',
      },
      {
        title: 'Introduction to Linear Algebra',
        authors: ['Gilbert Strang'],
        edition: '6th',
        year: 2023,
        why: 'The standard applied treatment of diagonalization, symmetric matrices, and their use in solving systems of differential equations.',
      },
      {
        title: 'Matrix Analysis',
        authors: ['Roger A. Horn', 'Charles R. Johnson'],
        edition: '2nd',
        year: 2012,
        why: 'The definitive graduate reference on eigenvalue theory, canonical forms, and spectral inequalities.',
      },
    ],
    keyFormulas: [
      { label: 'Eigenvalue equation', latex: 'Av=\\lambda v' },
      { label: 'Characteristic polynomial', latex: 'p(\\lambda)=\\det(A-\\lambda I)' },
      { label: 'Diagonalization', latex: 'A=PDP^{-1}' },
      { label: 'Spectral theorem (symmetric case)', latex: 'A=Q\\Lambda Q^{T},\\quad Q^{T}Q=I' },
    ],
    externalRefs: [
      { label: 'Encyclopedia of Mathematics: Eigen value', url: 'https://encyclopediaofmath.org/wiki/Eigen_value', kind: 'encyclopedia' },
      { label: 'MacTutor: Camille Jordan', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Jordan/', kind: 'reference' },
      { label: 'Wikipedia: Eigenvalues and eigenvectors', url: 'https://en.wikipedia.org/wiki/Eigenvalues_and_eigenvectors', kind: 'encyclopedia' },
    ],
  },
  'linear-algebra:inner-product-spaces': {
    overview:
      'An inner product space is a vector space equipped with a notion of angle and length: an inner product $\\langle u,v\\rangle$ that generalizes the familiar dot product. This single extra structure lets you talk about orthogonality, projection, and distance, turning bare linear algebra into geometry.',
    formal:
      'An inner product on a real (or complex) vector space $V$ is a map $\\langle\\cdot,\\cdot\\rangle:V\\times V\\to \\mathbb{R}$ (or $\\mathbb{C}$) that is linear in the first argument, conjugate-symmetric ($\\langle u,v\\rangle=\\overline{\\langle v,u\\rangle}$), and positive definite ($\\langle v,v\\rangle>0$ for $v\\neq 0$); it induces the norm $\\|v\\|=\\sqrt{\\langle v,v\\rangle}$. Every inner product satisfies the Cauchy-Schwarz inequality $|\\langle u,v\\rangle|\\le \\|u\\|\\,\\|v\\|$, and the Gram-Schmidt process converts any basis into an orthonormal one, $\\{e_1,\\dots,e_n\\}$ with $\\langle e_i,e_j\\rangle=\\delta_{ij}$.',
    keyIdeas: [
      'the inner product as a generalized dot product measuring angle and length',
      'orthogonality and orthonormal bases via Gram-Schmidt',
      'orthogonal projection onto a subspace as the best approximation',
      'the Cauchy-Schwarz and triangle inequalities',
      'self-adjoint (symmetric/Hermitian) operators and the spectral theorem',
    ],
    whyItMatters:
      'Adding an inner product is what makes least-squares regression, Fourier series, and quantum mechanics possible: each is fundamentally about projecting a vector orthogonally onto a subspace (the best-fit line, the closest trigonometric approximation, the most likely measured state), and orthogonal projection only makes sense once you have an inner product to define "closest" and "perpendicular."',
    prerequisites: ['linear-algebra:eigenvalues'],
    related: ['linear-algebra:singular-value-decomposition', 'functional-analysis:hilbert-spaces', 'real-analysis:fourier-series'],
    historicalContext:
      "The geometric dot product for vectors in $\\mathbb{R}^3$ was formalized by Josiah Willard Gibbs and Oliver Heaviside in the 1880s from Hamilton's quaternion calculus, but the abstract axiomatic inner product space emerged from David Hilbert's 1904-1910 work on integral equations, where he studied sequence and function spaces with an inner-product-like bilinear form to generalize Fourier analysis. John von Neumann coined the term 'Hilbert space' in 1929 and gave the modern axiomatic definition while formalizing the mathematics of quantum mechanics, in which inner products directly compute transition probabilities between states.",
    contributorIds: ['person:david-hilbert', 'person:john-von-neumann', 'person:augustin-louis-cauchy'],
    workIds: [],
    exampleProblems: [
      'Apply the Gram-Schmidt process to $v_1=(1,1,0),\\,v_2=(1,0,1)$ to produce an orthonormal basis for their span.',
      'Prove the Cauchy-Schwarz inequality $|\\langle u,v\\rangle|\\le\\|u\\|\\|v\\|$ starting from positive definiteness of $\\|u-tv\\|^2$.',
      'Find the orthogonal projection of $(1,2,3)$ onto the plane $x+y+z=0$.',
    ],
    applications: [
      'least-squares curve fitting and linear regression',
      'Fourier series as orthogonal projection onto sinusoidal basis functions',
      'quantum mechanics, where inner products of state vectors give transition probabilities',
      'orthogonal matrices and rotations in computer graphics and robotics',
    ],
    researchDirections: [
      'reproducing kernel Hilbert spaces underlying kernel methods in machine learning',
      'infinite-dimensional inner product (Hilbert) spaces in functional analysis and quantum theory',
      'indefinite and Krein-space inner products in relativity and signal processing',
    ],
    textbooks: [
      {
        title: 'Linear Algebra Done Right',
        authors: ['Sheldon Axler'],
        edition: '4th',
        year: 2024,
        why: 'Devotes a full, careful chapter to inner product spaces, orthogonality, and the spectral theorem for self-adjoint and normal operators.',
      },
      {
        title: 'Finite-Dimensional Vector Spaces',
        authors: ['Paul R. Halmos'],
        edition: '2nd',
        year: 1958,
        why: 'A classic axiomatic treatment that moves cleanly from vector spaces to inner products, adjoints, and self-adjoint transformations.',
      },
      {
        title: 'Introduction to Linear Algebra',
        authors: ['Gilbert Strang'],
        edition: '6th',
        year: 2023,
        why: 'Motivates orthogonality and projections concretely through least squares, the standard route most students first meet inner product spaces.',
      },
    ],
    keyFormulas: [
      { label: 'Cauchy-Schwarz inequality', latex: '|\\langle u,v\\rangle|\\le \\|u\\|\\,\\|v\\|' },
      { label: 'Orthogonal projection', latex: '\\operatorname{proj}_u v=\\frac{\\langle v,u\\rangle}{\\langle u,u\\rangle}u' },
      { label: 'Parseval / orthonormal expansion', latex: 'v=\\sum_{i=1}^n \\langle v,e_i\\rangle e_i,\\qquad \\|v\\|^2=\\sum_i|\\langle v,e_i\\rangle|^2' },
    ],
    externalRefs: [
      { label: 'Encyclopedia of Mathematics: Inner product', url: 'https://encyclopediaofmath.org/wiki/Inner_product', kind: 'encyclopedia' },
      { label: 'MacTutor: David Hilbert', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Hilbert/', kind: 'reference' },
      { label: 'Wikipedia: Inner product space', url: 'https://en.wikipedia.org/wiki/Inner_product_space', kind: 'encyclopedia' },
    ],
  },
  'linear-algebra:singular-value-decomposition': {
    overview:
      'The singular value decomposition (SVD) factors any matrix — even a non-square or non-invertible one — into a rotation, a scaling along orthogonal axes, and another rotation. It is the closest thing linear algebra has to a universal "best" factorization, because it exists for every matrix and directly exposes rank, norm, and the best low-rank approximation.',
    formal:
      'Every $A\\in\\mathbb{R}^{m\\times n}$ (or $\\mathbb{C}^{m\\times n}$) can be written $A=U\\Sigma V^{T}$ (or $V^{*}$), where $U\\in\\mathbb{R}^{m\\times m}$ and $V\\in\\mathbb{R}^{n\\times n}$ are orthogonal and $\\Sigma\\in\\mathbb{R}^{m\\times n}$ is diagonal with non-negative entries $\\sigma_1\\ge\\sigma_2\\ge\\cdots\\ge 0$ (the singular values), the square roots of the eigenvalues of $A^{T}A$. The Eckart-Young theorem states that truncating the SVD to its top $k$ singular values gives the best rank-$k$ approximation to $A$ in both the operator and Frobenius norms.',
    keyIdeas: [
      'factoring any matrix as rotation-scale-rotation, $A=U\\Sigma V^{T}$',
      'singular values as the square roots of the eigenvalues of $A^{T}A$',
      'the SVD as a generalization of eigendecomposition to non-square and non-normal matrices',
      'the Eckart-Young theorem: truncated SVD gives the optimal low-rank approximation',
      'the pseudoinverse and its role in solving least-squares problems robustly',
    ],
    whyItMatters:
      "The SVD is the workhorse numerical decomposition of applied linear algebra: it gives the numerically stable way to compute rank, condition number, and least-squares solutions, and its optimal low-rank approximation property is exactly what underlies principal component analysis, image compression, and recommender systems — Trefethen and Bau open their classic numerical linear algebra text by calling the SVD 'the climax of this linear algebra course.'",
    prerequisites: ['linear-algebra:inner-product-spaces'],
    related: ['numerical-analysis:numerical-linear-algebra', 'machine-learning-theory:kernel-methods', 'statistics:regression'],
    historicalContext:
      'Eugenio Beltrami (1873) and Camille Jordan (1874) independently discovered the singular value decomposition of a real matrix while studying bilinear and quadratic forms, showing the singular values are invariant under orthogonal changes of basis. James Joseph Sylvester rediscovered it again in 1889. It remained a largely theoretical curiosity in pure linear algebra until Erhard Schmidt (1907) extended it to integral operators and Gene Golub and William Kahan (1965) devised a numerically stable algorithm for computing it on a computer, after which the SVD became the standard tool of modern numerical linear algebra, statistics, and data analysis.',
    contributorIds: ['person:eugenio-beltrami', 'person:camille-jordan', 'person:james-joseph-sylvester'],
    workIds: ['work:numerical-linear-algebra'],
    exampleProblems: [
      'Compute the SVD of $A=\\begin{pmatrix}3&0\\\\0&0\\\\0&2\\end{pmatrix}$ by finding the eigenvalues and eigenvectors of $A^{T}A$.',
      'Show that the best rank-1 approximation of a matrix $A$ in Frobenius norm is $\\sigma_1 u_1 v_1^{T}$, using its SVD.',
      'Explain how the SVD is used to compute the Moore-Penrose pseudoinverse of a non-square matrix.',
    ],
    applications: [
      'principal component analysis for dimensionality reduction and data visualization',
      'image and signal compression by truncating small singular values',
      'recommender systems via low-rank matrix factorization',
      'computing numerically stable least-squares solutions and matrix pseudoinverses',
    ],
    researchDirections: [
      'randomized numerical linear algebra for computing approximate SVDs of massive matrices',
      'robust and sparse PCA methods resistant to outliers and missing data',
      'tensor decompositions (e.g. higher-order SVD) generalizing SVD beyond two dimensions',
    ],
    textbooks: [
      {
        title: 'Numerical Linear Algebra',
        authors: ['Lloyd N. Trefethen', 'David Bau III'],
        year: 1997,
        why: 'Builds the entire course around the SVD as the central organizing decomposition, exactly the treatment most graduate numerical linear algebra courses follow.',
      },
      {
        title: 'Matrix Analysis',
        authors: ['Roger A. Horn', 'Charles R. Johnson'],
        edition: '2nd',
        year: 2012,
        why: 'Gives the rigorous existence proof of the SVD and its relationship to eigenvalues, norms, and matrix approximation theorems.',
      },
      {
        title: 'Introduction to Linear Algebra',
        authors: ['Gilbert Strang'],
        edition: '6th',
        year: 2023,
        why: "Strang calls the SVD the 'fundamental theorem of linear algebra' and builds a full geometric and applied intuition for it aimed at practitioners.",
      },
    ],
    keyFormulas: [
      { label: 'Singular value decomposition', latex: 'A=U\\Sigma V^{T}' },
      { label: 'Singular values from A^T A', latex: '\\sigma_i=\\sqrt{\\lambda_i(A^{T}A)}' },
      { label: 'Eckart-Young best rank-k approximation', latex: 'A_k=\\sum_{i=1}^k \\sigma_i u_i v_i^{T}=\\arg\\min_{\\operatorname{rank}(B)\\le k}\\|A-B\\|_F' },
    ],
    externalRefs: [
      { label: 'Wikipedia: Singular value decomposition', url: 'https://en.wikipedia.org/wiki/Singular_value_decomposition', kind: 'encyclopedia' },
      { label: 'MacTutor: Camille Jordan', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Jordan/', kind: 'reference' },
      { label: 'MacTutor: James Joseph Sylvester', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Sylvester/', kind: 'reference' },
    ],
  },
  'set-theory:forcing': {
    formal:
      'Forcing extends a model of set theory by adding a generic filter over a partially ordered set while controlling truth in the extension.',
    keyIdeas: ['generic extensions', 'independence proofs', 'partial orders', 'Boolean-valued models'],
  },
  'logic:incompleteness-theorems': {
    formal:
      'Any sufficiently expressive consistent formal system cannot prove every arithmetical truth expressible in its language.',
    keyIdeas: ['self-reference', 'arithmetization of syntax', 'consistency', 'formal limits'],
  },
  'number-theory:modular-forms': {
    formal:
      'A modular form is a holomorphic function on the upper half-plane satisfying a transformation law under a modular group and growth conditions at cusps.',
    keyIdeas: ['symmetry', 'q-expansions', 'L-functions', 'arithmetic geometry'],
  },
  'cryptography:zero-knowledge-proofs': {
    formal:
      'A zero-knowledge proof lets a prover convince a verifier that a statement is true without revealing information beyond its truth.',
    keyIdeas: ['completeness', 'soundness', 'privacy', 'interactive proofs'],
  },
  'probability:central-limit-theorem': {
    formal:
      'Under broad hypotheses, normalized sums of independent random variables converge in distribution to a normal law.',
    keyIdeas: ['normal approximation', 'convergence in distribution', 'scaling', 'universality'],
  },
  'topology:homology': {
    formal:
      'Homology assigns algebraic invariants to spaces by taking cycles modulo boundaries in a chain complex.',
    keyIdeas: ['holes', 'chain complexes', 'functoriality', 'topological invariants'],
  },
  'analysis:sequences-and-series': {
    overview:
      'A sequence converges if its terms eventually cluster arbitrarily close to a limit, and a series converges if its sequence of partial sums does. This topic develops convergence in the general setting of metric and normed spaces rather than just the real line: completeness, absolute versus conditional convergence, and the sharp tests that decide when an infinite sum has a well-defined value at all.',
    formal:
      'In a metric space $(X,d)$, a sequence $(x_n)$ is Cauchy if $\\forall\\varepsilon>0\\ \\exists N:\\ m,n>N\\implies d(x_m,x_n)<\\varepsilon$, and $X$ is complete if every Cauchy sequence converges in $X$. For a series $\\sum a_n$ of real or complex numbers, the ratio test says $\\sum a_n$ converges absolutely if $\\limsup_{n\\to\\infty}\\left|\\frac{a_{n+1}}{a_n}\\right|<1$ and diverges if this limit exceeds $1$. Riemann\'s rearrangement theorem states that if $\\sum a_n$ converges conditionally (converges, but $\\sum|a_n|=\\infty$), then for any $L\\in\\mathbb{R}\\cup\\{\\pm\\infty\\}$ there is a rearrangement of the terms whose partial sums converge to $L$.',
    keyIdeas: [
      'Cauchy sequences and completeness of a metric or normed space',
      'absolute convergence versus merely conditional convergence',
      'convergence tests: comparison, ratio, root, integral, and alternating series tests',
      'uniform versus pointwise convergence of sequences of functions',
      "Riemann's rearrangement theorem: a conditionally convergent series has no order-independent sum",
    ],
    whyItMatters:
      "Convergence tests are what make power series, Fourier series, and iterative numerical algorithms trustworthy rather than just formally suggestive, and Riemann's rearrangement theorem is a sharp warning that infinite sums do not automatically inherit the commutativity of finite sums — a series must converge absolutely before its terms can be reordered safely.",
    prerequisites: [],
    related: ['analysis:continuity', 'calculus:taylor-series', 'real-analysis:l-p-spaces'],
    historicalContext:
      "Zeno's paradoxes (5th century BCE) first posed the puzzle of summing infinitely many terms, and 17th-18th century mathematicians including Newton, Leibniz, and Euler manipulated infinite series freely with little regard for convergence — Euler notoriously assigned $1-1+1-1+\\cdots$ the value $1/2$ by formal averaging. Augustin-Louis Cauchy's Cours d'Analyse (1821) supplied the first rigorous convergence criteria, including the ratio test and the Cauchy criterion for sequences, and Niels Henrik Abel complained in an 1826 letter that 'divergent series are, in general, something fatal, and it is a disgrace to base any proof on them.' Bernhard Riemann's 1854 Habilitationsschrift then proved the startling rearrangement theorem, showing that conditional convergence hides a genuine ambiguity that Cauchy's generation had not confronted.",
    contributorIds: ['person:augustin-louis-cauchy', 'person:karl-weierstrass', 'person:bernhard-riemann'],
    workIds: ['work:cours-danalyse'],
    exampleProblems: [
      'Use the integral test to determine whether $\\sum_{n=2}^{\\infty}\\frac{1}{n\\ln n}$ converges.',
      'Show that the alternating harmonic series $\\sum(-1)^{n+1}/n$ converges conditionally but not absolutely.',
      'Prove that every Cauchy sequence of real numbers converges, using the Bolzano-Weierstrass theorem.',
    ],
    applications: [
      'convergence guarantees for power series and Fourier series in engineering and physics',
      'error control and convergence analysis of iterative numerical algorithms',
      'summability methods (Abel, Cesàro) for divergent series in physics and combinatorics',
      'convergence of infinite sums in probability (expectations of discrete random variables)',
    ],
    researchDirections: [
      'divergent series and summability theory (Borel summation) applied to quantum field theory',
      'convergence of random and stochastic series in probability theory',
      'convergence rates and acceleration methods in numerical analysis and optimization',
    ],
    textbooks: [
      {
        title: 'Principles of Mathematical Analysis',
        authors: ['Walter Rudin'],
        edition: '3rd',
        year: 1976,
        why: "Known as 'baby Rudin,' this is the most widely assigned text for a rigorous undergraduate analysis course and gives the canonical treatment of sequences, series, and convergence tests.",
      },
      {
        title: 'Real Mathematical Analysis',
        authors: ['Charles C. Pugh'],
        edition: '2nd',
        year: 2015,
        why: 'A geometrically motivated alternative to Rudin, frequently recommended alongside it for building intuition about convergence before formalizing it.',
      },
      {
        title: 'Understanding Analysis',
        authors: ['Stephen Abbott'],
        edition: '2nd',
        year: 2015,
        why: "Motivates the standard convergence tests by walking through the historical failures (Euler's divergent series, naive term-by-term reasoning) that made them necessary.",
      },
    ],
    keyFormulas: [
      { label: 'Cauchy criterion for sequences', latex: '\\forall\\varepsilon>0\\,\\exists N:\\ m,n>N\\implies |a_m-a_n|<\\varepsilon' },
      { label: 'Ratio test', latex: 'L=\\limsup_{n\\to\\infty}\\left|\\frac{a_{n+1}}{a_n}\\right|,\\quad L<1\\implies \\text{converges absolutely}' },
      { label: 'Geometric series', latex: '\\sum_{n=0}^{\\infty} r^n = \\frac{1}{1-r},\\qquad |r|<1' },
    ],
    externalRefs: [
      { label: 'Encyclopedia of Mathematics: Convergence, types of', url: 'https://encyclopediaofmath.org/wiki/Convergence,_types_of', kind: 'encyclopedia' },
      { label: 'MacTutor: Augustin-Louis Cauchy', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Cauchy/', kind: 'reference' },
      { label: 'Wikipedia: Riemann series theorem', url: 'https://en.wikipedia.org/wiki/Riemann_series_theorem', kind: 'encyclopedia' },
    ],
  },
  'analysis:continuity': {
    overview:
      'Continuity says that small changes to the input of a function produce only small changes to its output. Framed in a general metric or topological space rather than just on the real line, continuity turns out to be exactly the condition that preimages of open sets are open — which is why compactness and connectedness, both purely topological properties, force strong consequences (attained extrema, intermediate values) on any continuous function.',
    formal:
      'A function $f:(X,d_X)\\to(Y,d_Y)$ is continuous at $x_0$ if $\\forall\\varepsilon>0\\ \\exists\\delta>0:\\ d_X(x,x_0)<\\delta\\implies d_Y(f(x),f(x_0))<\\varepsilon$; equivalently, $f$ is continuous on $X$ iff $f^{-1}(U)$ is open in $X$ for every open $U\\subseteq Y$. $f$ is uniformly continuous if $\\delta$ can be chosen independently of $x_0$. If $X$ is compact, every continuous $f:X\\to\\mathbb{R}$ is bounded and attains its maximum and minimum (the extreme value theorem), and is automatically uniformly continuous (the Heine-Cantor theorem); if $X$ is connected, $f(X)$ is connected, generalizing the intermediate value theorem.',
    keyIdeas: [
      'the topological (open-set) reformulation of continuity',
      'uniform continuity versus pointwise continuity at each point',
      'compactness forces continuous real functions to be bounded and attain extrema',
      'connectedness and the intermediate value theorem',
      'the Heine-Cantor theorem: continuous on a compact space implies uniformly continuous',
    ],
    whyItMatters:
      'Recasting continuity as "preimages of open sets are open" strips away any reference to distance, which is exactly what lets the same continuity machinery apply to spaces with no natural metric at all, and it is the mechanism behind an enormous number of existence proofs — root-finding, optimization, and fixed-point theorems all ultimately rest on continuous functions being well-behaved on compact or connected domains.',
    prerequisites: ['analysis:sequences-and-series'],
    related: ['analysis:metric-spaces', 'topology:compactness', 'calculus:limits'],
    historicalContext:
      "Bernard Bolzano gave a rigorous proof of the intermediate value theorem in Rein analytischer Beweis (1817) using reasoning close to the modern epsilon-delta approach, decades before it was widely adopted, but his work went almost unnoticed. Cauchy's Cours d'Analyse (1821) offered a still-informal continuity definition in terms of infinitesimals, and Karl Weierstrass's Berlin lectures from the 1860s fixed the modern epsilon-delta definition of continuity at a point. Eduard Heine proved in 1872 that continuity on a closed bounded interval implies uniform continuity, a result now named for Heine and Georg Cantor, and Maurice Fréchet's 1906 thesis recast continuity in terms of open sets in an abstract metric space, the formulation that generalizes directly to topological spaces.",
    contributorIds: ['person:bernard-bolzano', 'person:karl-weierstrass', 'person:maurice-frechet'],
    workIds: ['work:cours-danalyse'],
    exampleProblems: [
      'Prove using epsilon-delta that $f(x)=x^2$ is continuous but not uniformly continuous on $\\mathbb{R}$, yet is uniformly continuous on any bounded interval.',
      'Use the intermediate value theorem to show $x^3-x-1=0$ has a root in $(1,2)$.',
      'Give an example of a continuous bijection between metric spaces whose inverse is discontinuous, and explain why this cannot happen when the domain is compact.',
    ],
    applications: [
      'root-finding algorithms (bisection, Newton\'s method) that rely on the intermediate value theorem',
      'existence of equilibria in economics and game theory via fixed-point theorems',
      'well-posedness and numerical stability of computational methods',
      'existence of optimal solutions in optimization via the extreme value theorem',
    ],
    researchDirections: [
      'regularity and continuity of functions on fractal or non-smooth domains',
      'continuity of linear and nonlinear operators in functional analysis',
      'computable analysis: which continuous functions can be evaluated algorithmically to any precision',
    ],
    textbooks: [
      {
        title: 'Principles of Mathematical Analysis',
        authors: ['Walter Rudin'],
        edition: '3rd',
        year: 1976,
        why: 'Gives the standard rigorous development of continuity, uniform continuity, and their interaction with compactness and connectedness.',
      },
      {
        title: 'Real Mathematical Analysis',
        authors: ['Charles C. Pugh'],
        edition: '2nd',
        year: 2015,
        why: 'Builds strong geometric intuition for why compactness and connectedness are the properties that make continuity powerful.',
      },
      {
        title: 'Topology',
        authors: ['James R. Munkres'],
        edition: '2nd',
        year: 2000,
        why: 'The standard reference for the fully topological (open-set) formulation of continuity beyond metric spaces, used widely in graduate topology courses.',
      },
    ],
    keyFormulas: [
      { label: 'Epsilon-delta continuity', latex: '\\forall\\varepsilon>0\\,\\exists\\delta>0:\\ d_X(x,x_0)<\\delta \\implies d_Y(f(x),f(x_0))<\\varepsilon' },
      { label: 'Open-set characterization', latex: 'f \\text{ continuous} \\iff f^{-1}(U) \\text{ open for every open } U' },
      { label: 'Heine-Cantor theorem', latex: 'X \\text{ compact and } f \\text{ continuous} \\implies f \\text{ uniformly continuous}' },
    ],
    externalRefs: [
      { label: 'Encyclopedia of Mathematics: Continuous function', url: 'https://encyclopediaofmath.org/wiki/Continuous_function', kind: 'encyclopedia' },
      { label: 'MacTutor: Bernard Bolzano', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Bolzano/', kind: 'reference' },
      { label: 'MacTutor: Maurice Fréchet', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Frechet/', kind: 'reference' },
    ],
  },
  'analysis:differentiation': {
    overview:
      "This topic develops the structural consequences of differentiability, centered on the Mean Value Theorem: the fact that a function's average rate of change over an interval is achieved exactly by its instantaneous rate of change at some interior point. It is what turns local derivative information into global statements about a function's behavior.",
    formal:
      "Rolle's theorem: if $f:[a,b]\\to\\mathbb{R}$ is continuous on $[a,b]$, differentiable on $(a,b)$, and $f(a)=f(b)$, then there exists $c\\in(a,b)$ with $f'(c)=0$. The Mean Value Theorem generalizes this: there exists $c\\in(a,b)$ with $f'(c)=\\dfrac{f(b)-f(a)}{b-a}$. Cauchy's generalized Mean Value Theorem states that for $f,g$ differentiable on $(a,b)$ with $g'\\neq 0$, there is $c\\in(a,b)$ with $\\dfrac{f'(c)}{g'(c)}=\\dfrac{f(b)-f(a)}{g(b)-g(a)}$, which is the fact underlying L'Hôpital's rule for indeterminate limits.",
    keyIdeas: [
      "Rolle's theorem as the geometric seed of the Mean Value Theorem",
      'the Mean Value Theorem: local derivative information forces global behavior',
      "Cauchy's generalized Mean Value Theorem and L'Hôpital's rule",
      "monotonicity and convexity criteria derived from the sign of $f'$ and $f''$",
      'differentiability of vector-valued and multivariable functions',
    ],
    whyItMatters:
      "The Mean Value Theorem is the bridge between 'derivative at a point' and 'behavior of a function on an interval': without it, one cannot even prove that a function with zero derivative everywhere must be constant, a fact used implicitly throughout the theory of differential equations, numerical error bounds, and optimization.",
    prerequisites: ['analysis:continuity'],
    related: ['calculus:derivatives', 'analysis:integration', 'differential-equations:existence-and-uniqueness'],
    historicalContext:
      "Michel Rolle stated a version of his theorem for polynomials in Méthode pour résoudre les égalitéz (1691) — ironically, Rolle was a public critic of the new calculus who doubted the rigor of infinitesimals. Joseph-Louis Lagrange gave the Mean Value Theorem essentially in its modern form in Théorie des fonctions analytiques (1797), and Augustin-Louis Cauchy generalized it to the ratio form used to justify L'Hôpital's rule in his 1823 Résumé des leçons, finally putting on rigorous footing a rule that Guillaume de l'Hôpital had published in 1696 (based on results communicated to him by Johann Bernoulli) without proof.",
    contributorIds: ['person:michel-rolle', 'person:joseph-louis-lagrange', 'person:augustin-louis-cauchy'],
    workIds: [],
    exampleProblems: [
      "Use Rolle's theorem to show that between any two roots of a differentiable function lies a root of its derivative.",
      "Prove that a differentiable function with $f'(x)=0$ on an interval must be constant there, using the Mean Value Theorem.",
      "Use Cauchy's generalized Mean Value Theorem to justify L'Hôpital's rule for the indeterminate form $0/0$.",
    ],
    applications: [
      'error estimation in numerical approximation (Taylor remainder bounds derive from the Mean Value Theorem)',
      'proving uniqueness and monotonicity results for solutions of differential equations',
      'sensitivity and marginal analysis in economics and optimization',
    ],
    researchDirections: [
      'mean value inequalities in infinite-dimensional Banach spaces, where no exact equality version holds',
      "generalized derivatives (Clarke's generalized gradient) for nonsmooth analysis and optimization",
      'numerical algorithms exploiting Taylor remainder bounds for certified error control',
    ],
    textbooks: [
      {
        title: 'Principles of Mathematical Analysis',
        authors: ['Walter Rudin'],
        edition: '3rd',
        year: 1976,
        why: "Gives the standard rigorous proofs of Rolle's theorem, the Mean Value Theorem, and Cauchy's generalization in the real and vector-valued settings.",
      },
      {
        title: 'Calculus',
        authors: ['Michael Spivak'],
        edition: '4th',
        year: 2008,
        why: 'Presents the same theorems with an emphasis on geometric motivation and full proofs, at a level accessible before graduate analysis.',
      },
      {
        title: 'Real Mathematical Analysis',
        authors: ['Charles C. Pugh'],
        edition: '2nd',
        year: 2015,
        why: 'Places the Mean Value Theorem in context alongside convexity and monotonicity results with a strong geometric narrative.',
      },
    ],
    keyFormulas: [
      { label: "Rolle's theorem", latex: "f(a)=f(b) \\implies \\exists c\\in(a,b):\\ f'(c)=0" },
      { label: 'Mean Value Theorem', latex: "f'(c)=\\frac{f(b)-f(a)}{b-a}" },
      { label: "Cauchy's generalized Mean Value Theorem", latex: "\\frac{f'(c)}{g'(c)}=\\frac{f(b)-f(a)}{g(b)-g(a)}" },
    ],
    externalRefs: [
      { label: 'Wikipedia: Mean value theorem', url: 'https://en.wikipedia.org/wiki/Mean_value_theorem', kind: 'encyclopedia' },
      { label: 'MacTutor: Michel Rolle', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Rolle/', kind: 'reference' },
      { label: 'MacTutor: Augustin-Louis Cauchy', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Cauchy/', kind: 'reference' },
    ],
  },
  'analysis:integration': {
    overview:
      "The Riemann-Stieltjes integral generalizes the ordinary Riemann integral by integrating one function with respect to another, letting sums, weighted averages, and continuous integrals all be written in a single notation. It is the classical bridge between elementary Riemann integration and the full measure-theoretic (Lebesgue) theory.",
    formal:
      'For $f$ bounded on $[a,b]$ and $\\alpha$ monotonically increasing, the Riemann-Stieltjes integral $\\int_a^b f\\,d\\alpha$ is the common value of the upper and lower Riemann-Stieltjes sums $\\sum_i f(t_i)\\,[\\alpha(x_i)-\\alpha(x_{i-1})]$ as the partition mesh refines, whenever the upper and lower integrals agree. Taking $\\alpha(x)=x$ recovers the ordinary Riemann integral; taking $\\alpha$ a step function recovers a weighted (possibly infinite) sum, unifying discrete and continuous accumulation in one formula.',
    keyIdeas: [
      'integrating with respect to a general increasing (or bounded-variation) function',
      'the Riemann-Stieltjes integral as a common generalization of sums and Riemann integrals',
      'integration by parts for Stieltjes integrals',
      'existence: continuity of $f$ together with bounded variation of $\\alpha$ suffices',
      'the Riemann-Stieltjes integral as the natural language for expectation in probability',
    ],
    whyItMatters:
      'Writing expectation as $E[X]=\\int x\\,dF(x)$ for a random variable with distribution function $F$ works uniformly for discrete, continuous, and mixed distributions precisely because it is a Riemann-Stieltjes integral — this single formalism is why probability theory does not need separate notations and separate theorems for the discrete and continuous cases.',
    prerequisites: ['analysis:differentiation'],
    related: ['real-analysis:lebesgue-integration', 'probability:expectation', 'analysis:measure-theory'],
    historicalContext:
      'Thomas Joannes Stieltjes introduced the integral bearing his name in Recherches sur les fractions continues (1894) while studying continued fractions and the distribution of mass along a line — a proto-measure-theoretic problem. The Riemann-Stieltjes integral became a standard part of the analysis curriculum through the early 20th century as a natural halfway point between Bernhard Riemann\'s 1854 definition of the ordinary integral and Henri Lebesgue\'s fully measure-theoretic integral of 1902, which subsumes it as the special case of integrating against the measure induced by $\\alpha$.',
    contributorIds: ['person:thomas-joannes-stieltjes', 'person:bernhard-riemann'],
    workIds: [],
    exampleProblems: [
      'Compute $\\int_0^2 x\\,d\\alpha(x)$ where $\\alpha$ is a step function with a single jump of size 1 at $x=1$.',
      'Prove that if $f$ is continuous and $\\alpha$ has bounded variation on $[a,b]$, then $\\int_a^b f\\,d\\alpha$ exists.',
      'Show how $E[X]=\\int x\\,dF(x)$ specializes to a sum for a discrete random variable and to $\\int x f(x)\\,dx$ for a continuous one with density $f$.',
    ],
    applications: [
      'expectation and moments in probability theory, unifying discrete and continuous random variables',
      'survival analysis and actuarial science, integrating against a distribution function',
      'signal processing, integrating against measures with point masses representing impulses',
    ],
    researchDirections: [
      'extending Stieltjes integration to full Lebesgue-Stieltjes and general measure-theoretic integration',
      'stochastic (Itô) integration as a further generalization for integrating against random processes',
      'numerical quadrature methods for Stieltjes-type integrals in actuarial and statistical computing',
    ],
    textbooks: [
      {
        title: 'Principles of Mathematical Analysis',
        authors: ['Walter Rudin'],
        edition: '3rd',
        year: 1976,
        why: 'Gives the canonical rigorous treatment of the Riemann-Stieltjes integral, including existence theorems and integration by parts, that most analysis courses follow.',
      },
      {
        title: 'Mathematical Analysis',
        authors: ['Tom M. Apostol'],
        edition: '2nd',
        year: 1974,
        why: 'A careful, classically styled development of Riemann-Stieltjes integration alongside its connections to functions of bounded variation.',
      },
      {
        title: 'Real Analysis',
        authors: ['H. L. Royden', 'P. M. Fitzpatrick'],
        edition: '4th',
        year: 2010,
        why: 'Picks up where the Riemann-Stieltjes integral leaves off, showing how it generalizes into full Lebesgue-Stieltjes and measure-theoretic integration.',
      },
    ],
    keyFormulas: [
      { label: 'Riemann-Stieltjes integral (Riemann sum form)', latex: '\\int_a^b f\\,d\\alpha=\\lim_{\\|P\\|\\to 0}\\sum_i f(t_i)\\,[\\alpha(x_i)-\\alpha(x_{i-1})]' },
      { label: 'Integration by parts', latex: '\\int_a^b f\\,d\\alpha + \\int_a^b \\alpha\\,df = f(b)\\alpha(b)-f(a)\\alpha(a)' },
      { label: 'Expectation as a Stieltjes integral', latex: 'E[X]=\\int_{-\\infty}^{\\infty} x\\,dF(x)' },
    ],
    externalRefs: [
      { label: 'Encyclopedia of Mathematics: Riemann-Stieltjes integral', url: 'https://encyclopediaofmath.org/wiki/Riemann-Stieltjes_integral', kind: 'encyclopedia' },
      { label: 'MacTutor: Thomas Stieltjes', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Stieltjes/', kind: 'reference' },
      { label: 'Wikipedia: Riemann-Stieltjes integral', url: 'https://en.wikipedia.org/wiki/Riemann%E2%80%93Stieltjes_integral', kind: 'encyclopedia' },
    ],
  },
  'analysis:metric-spaces': {
    overview:
      'A metric space is a set equipped with a distance function obeying a few natural axioms — the minimal structure needed to talk about convergence, continuity, and completeness without reference to any particular ambient space like $\\mathbb{R}^n$. Once distance is axiomatized this way, the same machinery applies equally to numbers, functions, and probability distributions.',
    formal:
      'A metric on a set $X$ is a function $d:X\\times X\\to[0,\\infty)$ satisfying $d(x,y)=0\\iff x=y$, symmetry $d(x,y)=d(y,x)$, and the triangle inequality $d(x,z)\\le d(x,y)+d(y,z)$. $X$ is complete if every Cauchy sequence in $X$ converges to a point of $X$; a subset $K\\subseteq X$ is compact if every open cover of $K$ has a finite subcover, which in a metric space is equivalent to every sequence in $K$ having a subsequence converging to a point of $K$. The Baire category theorem states that in a complete metric space, a countable intersection of dense open sets is still dense.',
    keyIdeas: [
      'the triangle inequality as the essential axiom that makes distance behave sensibly',
      'open and closed sets, and continuity re-expressed via preimages of open sets',
      'completeness and Cauchy sequences',
      'compactness: the open-cover and sequential characterizations coincide in metric spaces',
      'the Baire category theorem as a nonconstructive existence tool',
    ],
    whyItMatters:
      "Axiomatizing 'distance' lets the same fixed-point and compactness arguments proved once, abstractly, guarantee the existence and uniqueness of solutions to differential equations (via the contraction mapping theorem applied to a complete metric space of functions), the convergence of numerical iteration schemes, and the completions used to construct the real numbers and $L^p$ spaces.",
    prerequisites: ['analysis:continuity'],
    related: ['topology:point-set-topology', 'functional-analysis:banach-spaces', 'differential-equations:existence-and-uniqueness'],
    historicalContext:
      "Maurice Fréchet introduced the abstract metric space, which he called an 'écart,' in his 1906 doctoral thesis Sur quelques points du calcul fonctionnel, unifying earlier ad hoc distance notions used by Volterra, Hadamard, and Arzelà to study spaces of functions. Felix Hausdorff's Grundzüge der Mengenlehre (1914) then built the fully general topological framework that metric spaces sit inside as a special case. The Baire category theorem, proved by René-Louis Baire for the real line in his 1899 doctoral thesis, was extended to general complete metric spaces and became one of the most productive nonconstructive existence tools across 20th-century analysis.",
    contributorIds: ['person:maurice-frechet', 'person:georg-cantor'],
    workIds: [],
    exampleProblems: [
      'Verify that $d(f,g)=\\sup_{x\\in[0,1]}|f(x)-g(x)|$ defines a metric on the continuous functions on $[0,1]$, and show this space is complete.',
      'Prove that a compact metric space is complete and bounded, and give an example of a complete, bounded metric space that is not compact.',
      'Use the Baire category theorem to show that $\\mathbb{R}$ cannot be written as a countable union of nowhere dense sets.',
    ],
    applications: [
      'the Banach fixed-point theorem guaranteeing existence and uniqueness of solutions to ODEs and integral equations',
      'convergence analysis of iterative numerical algorithms',
      'completions of spaces, such as constructing $\\mathbb{R}$ as the completion of $\\mathbb{Q}$, or $L^p$ spaces as completions of continuous functions',
      'metric embeddings and distance-based methods in machine learning',
    ],
    researchDirections: [
      'metric and coarse geometry, including Gromov-Hausdorff convergence of metric spaces',
      'computable and constructive analysis formulated over metric spaces',
      'optimal transport distances (Wasserstein metrics) between probability measures',
    ],
    textbooks: [
      {
        title: 'Principles of Mathematical Analysis',
        authors: ['Walter Rudin'],
        edition: '3rd',
        year: 1976,
        why: 'Chapters 2 and 7 give the standard rigorous treatment of metric space topology and the contraction/fixed-point results built on it.',
      },
      {
        title: 'Real Mathematical Analysis',
        authors: ['Charles C. Pugh'],
        edition: '2nd',
        year: 2015,
        why: 'Offers an unusually geometric and visual treatment of metric spaces, compactness, and completeness.',
      },
      {
        title: 'Topology',
        authors: ['James R. Munkres'],
        edition: '2nd',
        year: 2000,
        why: 'Places metric spaces inside the broader topological framework, the standard next step after a first course in metric-space analysis.',
      },
    ],
    keyFormulas: [
      { label: 'Triangle inequality', latex: 'd(x,z)\\le d(x,y)+d(y,z)' },
      { label: 'Cauchy sequence', latex: '\\forall\\varepsilon>0\\,\\exists N:\\ m,n>N \\implies d(x_m,x_n)<\\varepsilon' },
      { label: 'Banach fixed-point theorem', latex: 'd(T(x),T(y))\\le k\\,d(x,y),\\ k<1 \\implies \\exists! x^*:\\ T(x^*)=x^*' },
    ],
    externalRefs: [
      { label: 'Encyclopedia of Mathematics: Metric space', url: 'https://encyclopediaofmath.org/wiki/Metric_space', kind: 'encyclopedia' },
      { label: 'MacTutor: Maurice Fréchet', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Frechet/', kind: 'reference' },
      { label: 'Wikipedia: Baire category theorem', url: 'https://en.wikipedia.org/wiki/Baire_category_theorem', kind: 'encyclopedia' },
    ],
  },
  'analysis:measure-theory': {
    overview:
      'Measure theory extends the intuitive notions of length, area, and volume to a vast class of sets, and underlies the Lebesgue integral, which repairs serious limitations of the Riemann integral — most importantly, letting limits and integrals be interchanged far more often than classical Riemann theory allows.',
    formal:
      'A $\\sigma$-algebra $\\mathcal{M}$ on a set $X$ is a collection of subsets containing $\\emptyset$, closed under complements, and closed under countable unions. A measure $\\mu:\\mathcal{M}\\to[0,\\infty]$ satisfies $\\mu(\\emptyset)=0$ and countable additivity, $\\mu\\!\\left(\\bigcup_{n=1}^{\\infty}A_n\\right)=\\sum_{n=1}^{\\infty}\\mu(A_n)$ for pairwise disjoint $A_n\\in\\mathcal{M}$. Carathéodory\'s extension theorem shows that a countably additive set function on an algebra of sets (such as lengths of intervals) extends uniquely to a measure on the generated $\\sigma$-algebra, which is how Lebesgue measure on $\\mathbb{R}$ is rigorously constructed.',
    keyIdeas: [
      '$\\sigma$-algebras as the domains on which "size" can be consistently assigned',
      'countable additivity versus merely finite additivity',
      "Carathéodory's extension theorem: from a measure on simple sets to a full measure space",
      'null sets and properties holding "almost everywhere"',
      'the monotone and dominated convergence theorems governing when limits and integrals commute',
    ],
    whyItMatters:
      "Measure theory repairs the Riemann integral's biggest weakness — a pointwise limit of Riemann-integrable functions need not be Riemann integrable, and swapping limits with integrals often fails — through the Lebesgue integral's monotone and dominated convergence theorems, and it supplies the rigorous common foundation for modern probability theory (Kolmogorov's 1933 axioms are built directly on measure theory) and functional analysis.",
    prerequisites: ['analysis:metric-spaces'],
    related: ['real-analysis:lebesgue-integration', 'probability:sample-spaces', 'functional-analysis:normed-spaces'],
    historicalContext:
      "Émile Borel's Leçons sur la théorie des fonctions (1898) introduced countably additive measure on what are now called Borel sets, extending the earlier finitely-additive notions of content due to Peano and Jordan. Henri Lebesgue's 1902 doctoral thesis Intégrale, longueur, aire built the full Lebesgue measure and integral on the real line, resolving pathologies of the Riemann integral (the indicator function of the rationals, not Riemann integrable, becomes trivially Lebesgue integrable with integral zero). Constantin Carathéodory's 1918 extension theorem gave a general method for constructing measures from simpler set functions, and Andrey Kolmogorov's Grundbegriffe der Wahrscheinlichkeitsrechnung (1933) then built modern probability theory entirely on this measure-theoretic foundation.",
    contributorIds: ['person:henri-lebesgue', 'person:emile-borel', 'person:andrey-kolmogorov'],
    workIds: [],
    exampleProblems: [
      'Show that the indicator function of the rationals is Lebesgue measurable with measure zero, hence Lebesgue integrable with integral 0, despite not being Riemann integrable.',
      "Use Carathéodory's extension theorem informally to explain how Lebesgue measure on intervals extends to all Borel sets.",
      'State the Dominated Convergence Theorem and use it to justify interchanging a limit and an integral in a case where term-by-term reasoning alone is not obviously valid.',
    ],
    applications: [
      'rigorous foundations of probability theory via the Kolmogorov axioms',
      'Fourier analysis and $L^p$ space theory, both built on Lebesgue integration',
      'stochastic calculus in mathematical finance, resting on measure-theoretic probability',
      'information theory and signal processing, which rely on measurable functions and integrals',
    ],
    researchDirections: [
      'geometric measure theory: rectifiability, minimal surfaces, and currents',
      'measure-theoretic probability and stochastic analysis (martingales, stochastic integration)',
      'ergodic theory and invariant measures for dynamical systems',
    ],
    textbooks: [
      {
        title: 'Real Analysis',
        authors: ['H. L. Royden', 'P. M. Fitzpatrick'],
        edition: '4th',
        year: 2010,
        why: 'One of the most widely assigned graduate real analysis and measure theory texts, covering the Carathéodory construction through to $L^p$ spaces.',
      },
      {
        title: 'Real Analysis: Modern Techniques and Their Applications',
        authors: ['Gerald B. Folland'],
        edition: '2nd',
        year: 1999,
        why: "MIT's standard graduate real analysis text, praised for connecting abstract measure theory directly to Fourier analysis and probability.",
      },
      {
        title: 'Real and Complex Analysis',
        authors: ['Walter Rudin'],
        edition: '3rd',
        year: 1987,
        why: "Known as 'papa Rudin,' a classic and demanding graduate reference that develops measure theory before building complex analysis and functional analysis on top of it.",
      },
    ],
    keyFormulas: [
      { label: 'Countable additivity', latex: '\\mu\\!\\left(\\bigcup_{n=1}^{\\infty}A_n\\right)=\\sum_{n=1}^{\\infty}\\mu(A_n)\\quad (A_n \\text{ disjoint})' },
      { label: 'Monotone Convergence Theorem', latex: '0\\le f_n \\uparrow f \\implies \\int f_n\\,d\\mu \\to \\int f\\,d\\mu' },
      { label: 'Dominated Convergence Theorem', latex: 'f_n\\to f \\text{ a.e.},\\ |f_n|\\le g\\in L^1 \\implies \\int f_n\\,d\\mu \\to \\int f\\,d\\mu' },
    ],
    externalRefs: [
      { label: 'Encyclopedia of Mathematics: Carathéodory measure', url: 'https://encyclopediaofmath.org/wiki/Carath%C3%A9odory_measure', kind: 'encyclopedia' },
      { label: 'MacTutor: Henri Lebesgue', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Lebesgue/', kind: 'reference' },
      { label: 'MacTutor: Émile Borel', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Borel/', kind: 'reference' },
    ],
  },
  'algebra:polynomials': {
    overview:
      'Polynomials are the algebraic expressions built from a variable and coefficients using only addition and multiplication. Studying their roots and factorizations was the original problem of algebra, and the search for a formula solving the general polynomial equation — successful up to degree four but famously impossible beyond it — is the problem that led directly to the invention of group theory.',
    formal:
      'The polynomial ring $R[x]$ over a commutative ring $R$ consists of formal sums $\\sum a_i x^i$ with finitely many nonzero coefficients $a_i\\in R$. When $R=F$ is a field, $F[x]$ is a Euclidean domain (division with remainder holds), hence a principal ideal domain and a unique factorization domain: every nonzero polynomial factors into irreducibles uniquely up to order and units. The Fundamental Theorem of Algebra states that every nonconstant polynomial in $\\mathbb{C}[x]$ has a root in $\\mathbb{C}$, so the irreducible polynomials in $\\mathbb{C}[x]$ are exactly the linear ones.',
    keyIdeas: [
      'polynomial rings and division with remainder (the division algorithm)',
      'irreducibility and unique factorization in $F[x]$',
      'roots, multiplicity, and the Fundamental Theorem of Algebra',
      "Galois's insight: solvability of a polynomial equation by radicals is governed by the symmetry group of its roots",
      'polynomial rings in several variables and Gröbner bases',
    ],
    whyItMatters:
      'The centuries-long attempt to find a general formula solving polynomial equations by radicals — successful for degree 2, 3, and 4, but proved impossible in general for degree 5 — is precisely the problem that forced mathematicians to invent group theory in order to explain exactly which equations can be solved by a formula and which cannot.',
    prerequisites: [],
    related: ['algebra:groups', 'algebra:fields', 'abstract-algebra:galois-theory'],
    historicalContext:
      "Al-Khwarizmi's Al-Kitab al-mukhtasar fi hisab al-jabr wal-muqabala (c. 820) gave the first systematic classification and solution methods for linear and quadratic equations — the word 'algebra' derives from 'al-jabr' in its title. Omar Khayyam (c. 1070) solved cubic equations geometrically via intersecting conic sections, and the algebraic solution of the cubic and quartic appeared in Gerolamo Cardano's Ars Magna (1545), with the cubic formula obtained from Niccolò Tartaglia and Scipione del Ferro and the quartic solved by Cardano's student Lodovico Ferrari. Paolo Ruffini (1799) and Niels Henrik Abel (1824) showed no analogous radical formula exists for the general quintic, and Évariste Galois, in a memoir submitted in 1831 and published posthumously in 1846, explained precisely why: by attaching a permutation group to a polynomial's roots and showing that solvability by radicals corresponds exactly to a group-theoretic property (solvability of that group).",
    contributorIds: ['person:al-khwarizmi', 'person:gerolamo-cardano', 'person:evariste-galois'],
    workIds: ['work:al-kitab-al-mukhtasar-fi-hisab-al-jabr-wal-muqabala', 'work:ars-magna'],
    exampleProblems: [
      'Use Cardano\'s formula to solve $x^3-15x-4=0$, and explain the "casus irreducibilis" complication that arises even for a real root.',
      'Show that $x^4+1$ is irreducible over $\\mathbb{Q}$ but factors over $\\mathbb{R}$ and over $\\mathbb{F}_2$.',
      'Explain, without a full proof, why the general quintic cannot be solved by radicals even though every quartic can.',
    ],
    applications: [
      'error-correcting codes defined by polynomials over finite fields (Reed-Solomon, BCH codes)',
      'polynomial rings underlying elliptic-curve and lattice-based cryptosystems',
      'computer algebra systems using Gröbner bases to solve polynomial systems',
      'characteristic polynomials of linear systems in control theory and dynamical systems',
    ],
    researchDirections: [
      'computational algebraic geometry and Gröbner basis algorithms',
      'polynomial factorization and root-finding algorithms over finite fields',
      'the inverse Galois problem: which finite groups arise as Galois groups over $\\mathbb{Q}$',
    ],
    textbooks: [
      {
        title: 'Abstract Algebra',
        authors: ['David S. Dummit', 'Richard M. Foote'],
        edition: '3rd',
        year: 2004,
        why: 'The most widely used advanced-undergraduate and beginning-graduate algebra text, with an extensive, example-rich treatment of polynomial rings and their factorization theory.',
      },
      {
        title: 'Algebra',
        authors: ['Michael Artin'],
        edition: '2nd',
        year: 2010,
        why: "MIT's standard undergraduate algebra text, praised for grounding polynomial and Galois theory in concrete, computational examples.",
      },
      {
        title: 'Ideals, Varieties, and Algorithms',
        authors: ['David Cox', 'John Little', 'Donal O\'Shea'],
        edition: '4th',
        year: 2015,
        why: 'The standard introduction to computational and algorithmic aspects of polynomial rings, including Gröbner bases.',
      },
    ],
    keyFormulas: [
      { label: 'Division algorithm in F[x]', latex: 'f(x)=q(x)g(x)+r(x),\\quad \\deg r < \\deg g' },
      { label: "Cardano's formula (depressed cubic)", latex: 'x=\\sqrt[3]{-\\frac{q}{2}+\\sqrt{\\frac{q^2}{4}+\\frac{p^3}{27}}}+\\sqrt[3]{-\\frac{q}{2}-\\sqrt{\\frac{q^2}{4}+\\frac{p^3}{27}}}' },
      { label: 'Fundamental Theorem of Algebra', latex: '\\text{every nonconstant } p\\in\\mathbb{C}[x] \\text{ has a root in } \\mathbb{C}' },
    ],
    externalRefs: [
      { label: 'Encyclopedia of Mathematics: Algebra, fundamental theorem of', url: 'https://encyclopediaofmath.org/wiki/Algebra,_fundamental_theorem_of', kind: 'encyclopedia' },
      { label: 'MacTutor: Al-Khwarizmi', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Al-Khwarizmi/', kind: 'reference' },
      { label: 'MacTutor: Gerolamo Cardano', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Cardan/', kind: 'reference' },
    ],
  },
  'algebra:groups': {
    overview:
      'A group captures the mathematical essence of symmetry and reversible transformation: a set with one operation that is associative, has an identity element, and lets every operation be undone. Groups classify the symmetries of geometric objects, the structure of solutions to equations, and much more.',
    formal:
      "A group is a set $G$ with a binary operation $\\cdot:G\\times G\\to G$ satisfying associativity $(ab)c=a(bc)$, the existence of an identity $e$ with $ea=ae=a$ for all $a$, and the existence of inverses $a^{-1}$ with $aa^{-1}=a^{-1}a=e$ for every $a\\in G$. Lagrange's theorem: if $G$ is finite and $H\\le G$ is a subgroup, then $|H|$ divides $|G|$. Cayley's theorem: every group $G$ is isomorphic to a subgroup of the symmetric group $\\text{Sym}(G)$, via the left-regular action $g\\mapsto(x\\mapsto gx)$.",
    keyIdeas: [
      'symmetry made algebraic: groups as sets of reversible transformations',
      "subgroups, cosets, and Lagrange's theorem",
      'homomorphisms, kernels, normal subgroups, and quotient groups',
      "Cayley's theorem: every abstract group is a group of permutations",
      'group actions and orbits linking abstract groups to concrete symmetry',
    ],
    whyItMatters:
      "Group theory turns 'symmetry' from an intuitive idea into a rigorous algebraic structure, which is why the same theory classifies the symmetries of a molecule in chemistry, the conserved quantities of a physical system via Noether's theorem, the structure exploited (and defended against) in cryptographic protocols, and precisely which polynomial equations can be solved by a formula.",
    prerequisites: ['algebra:polynomials'],
    related: ['abstract-algebra:group-theory', 'algebra:representations', 'lie-theory:lie-groups'],
    historicalContext:
      "Joseph-Louis Lagrange (1770) and Paolo Ruffini studied permutations of the roots of equations before any abstract notion of 'group' existed. Évariste Galois was the first to use the word 'groupe' in this sense, in his 1831 memoir on the permutations preserving the algebraic relations among a polynomial's roots. Arthur Cayley gave the first abstract axiomatic definition of a finite group independent of any particular representation in his 1854 paper 'On the theory of groups, as depending on the symbolic equation $\\theta^n=1$,' and proved what is now called Cayley's theorem; Camille Jordan's Traité des substitutions et des équations algébriques (1870) then systematized the subject into a unified theory of permutation groups.",
    contributorIds: ['person:evariste-galois', 'person:arthur-cayley', 'person:camille-jordan'],
    workIds: ['work:memoire-sur-les-conditions-de-resolubilite-des-equations-par-radicaux'],
    exampleProblems: [
      "List all subgroups of the symmetric group $S_3$ and verify Lagrange's theorem for each.",
      "Prove Cayley's theorem by exhibiting the regular representation of a group of order 4.",
      'Show that the quotient group $\\mathbb{Z}/n\\mathbb{Z}$ is cyclic and determine its automorphism group.',
    ],
    applications: [
      'symmetry classification of molecules and crystals in chemistry (point groups, space groups)',
      "conservation laws in physics via Noether's theorem, applied to the symmetry group of a Lagrangian",
      'the discrete logarithm problem in finite groups underlying public-key cryptography',
      'error-correcting codes and combinatorial designs built from group actions',
    ],
    researchDirections: [
      'the classification of finite simple groups, completed in outline in the 1980s across tens of thousands of pages',
      'computational group theory and algorithms for very large finite groups (GAP, Magma)',
      'geometric group theory, studying infinite groups through their actions on geometric spaces',
    ],
    textbooks: [
      {
        title: 'Contemporary Abstract Algebra',
        authors: ['Joseph A. Gallian'],
        edition: '10th',
        year: 2021,
        why: 'One of the most widely used undergraduate introductions to group theory, known for its wealth of concrete examples and applications.',
      },
      {
        title: 'Abstract Algebra',
        authors: ['David S. Dummit', 'Richard M. Foote'],
        edition: '3rd',
        year: 2004,
        why: 'Gives the standard advanced treatment of group actions, Sylow theory, and the structure of finite groups.',
      },
      {
        title: 'Algebra',
        authors: ['Michael Artin'],
        edition: '2nd',
        year: 2010,
        why: 'Presents groups through their actions on concrete geometric and linear-algebraic objects, an approach widely praised for building intuition.',
      },
    ],
    keyFormulas: [
      { label: 'Group axioms', latex: '(ab)c=a(bc),\\quad ea=ae=a,\\quad aa^{-1}=a^{-1}a=e' },
      { label: "Lagrange's theorem", latex: 'H\\le G,\\ G \\text{ finite} \\implies |H| \\text{ divides } |G|' },
      { label: "Cayley's theorem", latex: 'G \\hookrightarrow \\text{Sym}(G)' },
    ],
    externalRefs: [
      { label: 'Encyclopedia of Mathematics: Group', url: 'https://encyclopediaofmath.org/wiki/Group', kind: 'encyclopedia' },
      { label: 'MacTutor: Évariste Galois', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Galois/', kind: 'reference' },
      { label: 'MacTutor: Arthur Cayley', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Cayley/', kind: 'reference' },
    ],
  },
  'algebra:rings': {
    overview:
      'A ring generalizes the integers: a set with addition and multiplication where addition forms an abelian group and multiplication distributes over it, but multiplication need not be commutative and elements need not have multiplicative inverses. Rings are the common algebraic home of number systems, polynomial systems, and matrix systems alike.',
    formal:
      'A ring is a set $R$ with operations $+,\\cdot$ such that $(R,+)$ is an abelian group, multiplication is associative, and the distributive laws $a(b+c)=ab+ac$ and $(a+b)c=ac+bc$ hold. An ideal $I\\subseteq R$ is a subgroup of $(R,+)$ closed under multiplication by any ring element ($rI\\subseteq I$ and $Ir\\subseteq I$ for all $r\\in R$); ideals are exactly the kernels of ring homomorphisms, and the First Isomorphism Theorem states $R/\\ker(\\phi)\\cong\\text{im}(\\phi)$ for any ring homomorphism $\\phi$.',
    keyIdeas: [
      'rings as number-system-like structures without guaranteed commutativity or invertibility',
      'ideals as the ring-theoretic analogue of normal subgroups',
      'quotient rings and the isomorphism theorems',
      'integral domains, units, and zero divisors',
      'polynomial and matrix rings as leading examples of commutative and noncommutative rings',
    ],
    whyItMatters:
      'Richard Dedekind introduced ideals specifically to repair unique factorization in rings of algebraic integers, where ordinary elements can factor into irreducibles in genuinely different ways; ideals restore a clean factorization theory (into prime ideals) that individual elements cannot always provide, and this single fix underlies both modern algebraic number theory and algebraic geometry.',
    prerequisites: ['algebra:groups'],
    related: ['algebra:fields', 'algebra:modules', 'commutative-algebra:ideals'],
    historicalContext:
      "Richard Dedekind introduced the concept of an ideal in his 1871 supplement to Dirichlet's Vorlesungen über Zahlentheorie, to repair the failure of unique factorization in rings of algebraic integers — famously, in $\\mathbb{Z}[\\sqrt{-5}]$, $6=2\\cdot 3=(1+\\sqrt{-5})(1-\\sqrt{-5})$ gives two genuinely different factorizations into irreducibles. David Hilbert's Zahlbericht (1897) organized the emerging theory of algebraic numbers, and Emmy Noether's foundational 1921 paper Idealtheorie in Ringbereichen isolated the ascending chain condition — the 'Noetherian' property — as the right finiteness hypothesis for ideal theory, launching abstract, axiomatic ring theory as a subject independent of number theory.",
    contributorIds: ['person:richard-dedekind', 'person:emmy-noether', 'person:david-hilbert'],
    workIds: [],
    exampleProblems: [
      'Show that $\\mathbb{Z}[\\sqrt{-5}]$ is not a unique factorization domain by exhibiting two genuinely different factorizations of $6$.',
      "Prove the First Isomorphism Theorem for rings: $R/\\ker(\\phi)\\cong\\text{im}(\\phi)$.",
      'Determine whether the ideal $(x^2+1)$ is prime or maximal in $\\mathbb{R}[x]$, and in $\\mathbb{C}[x]$.',
    ],
    applications: [
      'algebraic number theory, factoring ideals rather than elements in rings of integers',
      'coding theory: rings of polynomials modulo a fixed polynomial defining cyclic codes',
      'computer algebra and Gröbner basis computation in polynomial rings',
      'ring-based post-quantum cryptography (ring learning-with-errors schemes)',
    ],
    researchDirections: [
      'noncommutative ring theory and noncommutative algebraic geometry',
      'homological methods (Ext and Tor) for classifying modules over a ring',
      'ring-based lattice cryptography and its security assumptions',
    ],
    textbooks: [
      {
        title: 'Abstract Algebra',
        authors: ['David S. Dummit', 'Richard M. Foote'],
        edition: '3rd',
        year: 2004,
        why: 'Gives an extensive treatment of ring theory, from Euclidean domains through to Noetherian rings and unique factorization.',
      },
      {
        title: 'Topics in Algebra',
        authors: ['I. N. Herstein'],
        edition: '2nd',
        year: 1975,
        why: 'A classic, terse, and highly regarded treatment of ring theory that remains widely recommended for its elegant proofs.',
      },
      {
        title: 'Algebra',
        authors: ['Michael Artin'],
        edition: '2nd',
        year: 2010,
        why: 'Motivates rings and ideals through concrete examples in number theory and geometry before developing the general theory.',
      },
    ],
    keyFormulas: [
      { label: 'Distributive laws', latex: 'a(b+c)=ab+ac,\\qquad (a+b)c=ac+bc' },
      { label: 'First Isomorphism Theorem', latex: 'R/\\ker(\\phi)\\cong \\operatorname{im}(\\phi)' },
      { label: 'Non-unique factorization example', latex: '6=2\\cdot 3=(1+\\sqrt{-5})(1-\\sqrt{-5}) \\text{ in } \\mathbb{Z}[\\sqrt{-5}]' },
    ],
    externalRefs: [
      { label: 'Encyclopedia of Mathematics: Ring', url: 'https://encyclopediaofmath.org/wiki/Ring', kind: 'encyclopedia' },
      { label: 'Encyclopedia of Mathematics: Associative rings and algebras', url: 'https://encyclopediaofmath.org/wiki/Associative_rings_and_algebras', kind: 'encyclopedia' },
      { label: 'MacTutor: Richard Dedekind', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Dedekind/', kind: 'reference' },
    ],
  },
  'algebra:fields': {
    overview:
      'A field is a ring in which every nonzero element has a multiplicative inverse, so all four arithmetic operations behave as expected. Fields are the natural setting for solving equations and doing linear algebra, and the structure of their extensions encodes exactly which geometric constructions and polynomial equations are solvable.',
    formal:
      'A field is a commutative ring $F$ with $1\\neq 0$ in which every nonzero element has a multiplicative inverse. A field extension $F\\subseteq K$ has degree $[K:F]=\\dim_F K$ as an $F$-vector space, and the tower law states $[K:F]=[K:E][E:F]$ for any tower $F\\subseteq E\\subseteq K$. The Fundamental Theorem of Galois Theory sets up an order-reversing bijection between the subgroups of the Galois group $\\text{Gal}(K/F)$ of a finite Galois extension and the intermediate fields $F\\subseteq E\\subseteq K$.',
    keyIdeas: [
      'fields as the setting where all four arithmetic operations behave as expected',
      'field extensions and degree, governed by the multiplicative tower law',
      'algebraic versus transcendental extensions, and splitting fields',
      'the Galois group of an extension and the Fundamental Theorem of Galois Theory',
      'classical straightedge-and-compass constructions recast as questions about degree-2 field extensions',
    ],
    whyItMatters:
      'Field theory settles, once and for all, exactly which classical construction problems are impossible — doubling the cube, trisecting an arbitrary angle, squaring the circle — by translating each into a simple degree-counting statement about field extensions, and the Fundamental Theorem of Galois Theory converts hard questions about polynomial equations into questions about finite groups, which are usually far easier to answer.',
    prerequisites: ['algebra:rings'],
    related: ['algebra:polynomials', 'abstract-algebra:galois-theory', 'number-theory:algebraic-number-theory'],
    historicalContext:
      "Évariste Galois's 1831 memoir implicitly used field extensions to organize the symmetries of a polynomial's roots, but the modern axiomatic definition of an abstract field came later, from Heinrich Weber's 1893 paper and especially Ernst Steinitz's 1910 paper Algebraische Theorie der Körper ('Algebraic Theory of Fields'), which gave the first fully general axiomatic treatment of fields — including infinite fields and fields of positive characteristic — and is often regarded as the starting point of modern abstract algebra. Emil Artin's 1930s reformulation of Galois theory in terms of automorphism groups, rather than Galois's original language of permutations and resolvent equations, produced the clean statement of the Fundamental Theorem of Galois Theory used today.",
    contributorIds: ['person:evariste-galois', 'person:ernst-steinitz'],
    workIds: ['work:memoire-sur-les-conditions-de-resolubilite-des-equations-par-radicaux'],
    exampleProblems: [
      'Prove that doubling the cube is impossible with straightedge and compass by showing it requires a degree-3 extension of $\\mathbb{Q}$.',
      'Compute the Galois group of $x^4-2$ over $\\mathbb{Q}$ and list its subgroups.',
      'Show that a finite field has $p^n$ elements for a prime $p$ and positive integer $n$, and that any two finite fields of the same order are isomorphic.',
    ],
    applications: [
      'finite fields (Galois fields) underlying Reed-Solomon and BCH error-correcting codes',
      'finite-field arithmetic as the basis of AES encryption and elliptic-curve cryptography',
      'algebraic number theory, where number fields generalize the rational numbers',
      'resolving classical straightedge-and-compass construction problems from Greek geometry',
    ],
    researchDirections: [
      'the inverse Galois problem: determining which finite groups occur as Galois groups over $\\mathbb{Q}$',
      'explicit class field theory and its conjectural generalizations in the Langlands program',
      'computational Galois theory and fast algorithms over finite fields',
    ],
    textbooks: [
      {
        title: 'Abstract Algebra',
        authors: ['David S. Dummit', 'Richard M. Foote'],
        edition: '3rd',
        year: 2004,
        why: 'Contains one of the most thorough and widely used treatments of field theory and Galois theory at the advanced-undergraduate/graduate level.',
      },
      {
        title: 'Galois Theory',
        authors: ['Ian Stewart'],
        edition: '4th',
        year: 2015,
        why: 'A dedicated, consistently recommended standalone text focused entirely on field extensions and the Fundamental Theorem of Galois Theory.',
      },
      {
        title: 'Algebra',
        authors: ['Michael Artin'],
        edition: '2nd',
        year: 2010,
        why: "Presents Galois theory in the automorphism-group formulation due to Emil Artin, Michael Artin's father, who helped create it.",
      },
    ],
    keyFormulas: [
      { label: 'Tower law', latex: '[K:F]=[K:E][E:F]' },
      { label: 'Fundamental Theorem of Galois Theory', latex: '\\{\\text{subgroups of } \\text{Gal}(K/F)\\} \\longleftrightarrow \\{\\text{intermediate fields } F\\subseteq E\\subseteq K\\}' },
      { label: 'Order of a finite field', latex: '|F| = p^n \\text{ for prime } p' },
    ],
    externalRefs: [
      { label: 'Wikipedia: Field (mathematics)', url: 'https://en.wikipedia.org/wiki/Field_(mathematics)', kind: 'encyclopedia' },
      { label: 'MacTutor: Ernst Steinitz', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Steinitz/', kind: 'reference' },
      { label: 'Wikipedia: Fundamental theorem of Galois theory', url: 'https://en.wikipedia.org/wiki/Fundamental_theorem_of_Galois_theory', kind: 'encyclopedia' },
    ],
  },
  'algebra:modules': {
    overview:
      'A module generalizes a vector space by allowing scalars to come from a ring instead of a field. Giving up the guarantee that every nonzero scalar is invertible produces a much richer and more varied theory, since modules over general rings need not have a basis or even a well-defined notion of dimension.',
    formal:
      'A left module over a ring $R$ is an abelian group $M$ with an action $R\\times M\\to M$ satisfying $r(m+n)=rm+rn$, $(r+s)m=rm+sm$, $(rs)m=r(sm)$, and $1m=m$. $M$ is free if it has a basis (is isomorphic to $R^{(I)}$ for some index set $I$). The Structure Theorem for finitely generated modules over a PID states that every such module decomposes as $R^n\\oplus R/(d_1)\\oplus\\cdots\\oplus R/(d_k)$ with $d_1\\mid d_2\\mid\\cdots\\mid d_k$, which specializes to both the classification of finitely generated abelian groups (taking $R=\\mathbb{Z}$) and the Jordan/rational canonical forms of a linear operator (taking $R=F[x]$).',
    keyIdeas: [
      'modules as vector spaces over a ring instead of a field',
      'free modules, generators, and the failure of a well-defined dimension over general rings',
      'submodules, quotient modules, and exact sequences',
      'the Structure Theorem for finitely generated modules over a principal ideal domain',
      'modules as the natural language of representation theory and homological algebra',
    ],
    whyItMatters:
      "The Structure Theorem for finitely generated modules over a PID is a single theorem that simultaneously classifies all finitely generated abelian groups and explains why every matrix over a field has a Jordan or rational canonical form — both facts turn out to be exactly the same theorem in disguise, once a matrix is viewed as defining an $F[x]$-module.",
    prerequisites: ['algebra:rings'],
    related: ['linear-algebra:vector-spaces', 'abstract-algebra:homological-algebra', 'algebra:representations'],
    historicalContext:
      "Richard Dedekind's 1870s work on ideals implicitly treated ideals as modules over a ring of integers, and David Hilbert's 1890 Basissatz (basis theorem) proved finiteness results now understood as statements about modules over polynomial rings. Emmy Noether's 1921 paper Idealtheorie in Ringbereichen and her subsequent Göttingen lectures recast ideal theory explicitly in module-theoretic terms built on the ascending and descending chain conditions, establishing the module-centric viewpoint that dominates modern algebra. Bartel van der Waerden's textbook Moderne Algebra (1930-31), based directly on lectures by Noether and Emil Artin, then popularized this formulation for a generation of algebraists.",
    contributorIds: ['person:emmy-noether', 'person:richard-dedekind', 'person:david-hilbert'],
    workIds: [],
    exampleProblems: [
      'Classify all finitely generated abelian groups of order 360 using the Structure Theorem for modules over a PID.',
      'Show that a vector space is precisely a module over a field, and explain why modules over $\\mathbb{Z}$ (abelian groups) generally fail to be free while every vector space is.',
      'Use the Structure Theorem applied to $F[x]$-modules to explain why every matrix over an algebraically closed field has a Jordan canonical form.',
    ],
    applications: [
      'classification of finitely generated abelian groups in number theory and topology',
      'canonical forms (Jordan, rational) of matrices in linear algebra',
      'homological algebra, where Ext and Tor groups measure obstructions built from modules',
      'representation theory, where a group representation is exactly a module over the group ring',
    ],
    researchDirections: [
      'homological algebra and derived categories of modules',
      'module categories in noncommutative ring theory and noncommutative geometry',
      'modules over group rings in modular representation theory',
    ],
    textbooks: [
      {
        title: 'Abstract Algebra',
        authors: ['David S. Dummit', 'Richard M. Foote'],
        edition: '3rd',
        year: 2004,
        why: 'Gives a thorough treatment of module theory, from free modules through to the Structure Theorem over a PID and its applications to canonical forms.',
      },
      {
        title: 'Algebra',
        authors: ['Serge Lang'],
        edition: '3rd',
        year: 2002,
        why: 'A comprehensive graduate reference with an especially systematic treatment of modules, tensor products, and homological constructions.',
      },
      {
        title: 'Algebra',
        authors: ['Thomas W. Hungerford'],
        year: 1974,
        why: 'A standard graduate text particularly well regarded for its careful, general development of module theory.',
      },
    ],
    keyFormulas: [
      { label: 'Module axioms', latex: 'r(m+n)=rm+rn,\\quad (rs)m=r(sm),\\quad 1m=m' },
      { label: 'Structure theorem for f.g. modules over a PID', latex: 'M \\cong R^n \\oplus R/(d_1) \\oplus \\cdots \\oplus R/(d_k),\\quad d_1\\mid\\cdots\\mid d_k' },
    ],
    externalRefs: [
      { label: 'Encyclopedia of Mathematics: Module', url: 'https://encyclopediaofmath.org/wiki/Module', kind: 'encyclopedia' },
      { label: 'MacTutor: Emmy Noether', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Noether_Emmy/', kind: 'reference' },
      { label: 'MacTutor: Richard Dedekind', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Dedekind/', kind: 'reference' },
    ],
  },
  'algebra:representations': {
    overview:
      'A representation of a group realizes its abstract elements as matrices (or linear maps), turning group theory into linear algebra. This is often the most practical way to actually compute with a group, and is indispensable wherever symmetry meets linear structure, from quantum mechanics to chemistry.',
    formal:
      'A representation of a group $G$ on a vector space $V$ over a field $F$ is a group homomorphism $\\rho:G\\to GL(V)$. Its character is $\\chi(g)=\\operatorname{tr}(\\rho(g))$. Maschke\'s theorem guarantees that for a finite group $G$ and $F=\\mathbb{C}$ (or any field whose characteristic does not divide $|G|$), every representation decomposes as a direct sum of irreducible representations, and the characters of the irreducible representations satisfy the orthogonality relations $\\frac{1}{|G|}\\sum_{g\\in G}\\chi_i(g)\\overline{\\chi_j(g)}=\\delta_{ij}$, which forces the number of irreducible representations of $G$ to equal the number of conjugacy classes of $G$.',
    keyIdeas: [
      'representations as homomorphisms from a group into invertible matrices/linear maps',
      "Maschke's theorem: every finite-group representation over $\\mathbb{C}$ decomposes into irreducibles",
      'characters as a trace-based fingerprint that determines a representation up to isomorphism',
      'orthogonality relations among irreducible characters',
      'representations as modules over the group ring $F[G]$',
    ],
    whyItMatters:
      "Representation theory is what lets abstract symmetry make quantitative predictions: the allowed energy levels and spectroscopic transitions of an atom or molecule are dictated by which irreducible representations of its symmetry group appear, and character tables — a compact summary of a group's representation theory — are a standard working tool across chemistry, physics, and pure mathematics.",
    prerequisites: ['algebra:groups'],
    related: ['abstract-algebra:representation-theory', 'lie-theory:representation-of-lie-groups', 'linear-algebra:eigenvalues'],
    historicalContext:
      "Ferdinand Georg Frobenius founded representation and character theory of finite groups in a series of papers beginning in 1896, initially prompted by a question about group determinants posed to him by Richard Dedekind. William Burnside developed the theory further and used it to prove that every group of order $p^aq^b$ is solvable (Burnside's $p^aq^b$ theorem, 1904), while Issai Schur, Frobenius's student, proved Schur's lemma and developed the theory of projective representations in the early 1900s. Hermann Weyl extended representation theory from finite groups to compact and semisimple Lie groups in the 1920s, tying it directly to quantum mechanics and modern mathematical physics.",
    contributorIds: ['person:ferdinand-georg-frobenius', 'person:hermann-weyl'],
    workIds: [],
    exampleProblems: [
      'Construct the character table of the symmetric group $S_3$ and verify the orthogonality relations.',
      "Use Maschke's theorem to explain why representation theory of finite groups over $\\mathbb{C}$ is semisimple, and why this can fail in characteristic $p$ dividing $|G|$.",
      'Show, using the $S_3$ character table, that the number of irreducible representations of a finite group equals its number of conjugacy classes.',
    ],
    applications: [
      'selection rules and energy-level splitting in quantum mechanics and spectroscopy',
      'molecular vibration analysis in chemistry via character tables',
      'Fourier analysis as the representation theory of abelian groups, used in signal processing',
      'classification of elementary particles via representations of Lie groups in particle physics',
    ],
    researchDirections: [
      'modular representation theory (characteristic dividing the group order), still incompletely understood even for many finite simple groups',
      'the Langlands program, relating Galois representations to automorphic representations',
      'geometric representation theory, using algebraic geometry and category theory',
    ],
    textbooks: [
      {
        title: 'Linear Representations of Finite Groups',
        authors: ['Jean-Pierre Serre'],
        year: 1977,
        why: 'The classic, extremely compact standard reference for representation and character theory of finite groups.',
      },
      {
        title: 'Representation Theory: A First Course',
        authors: ['William Fulton', 'Joe Harris'],
        year: 1991,
        why: 'The standard graduate course text, covering finite groups, Lie groups, and Lie algebras in a unified, example-driven way.',
      },
      {
        title: 'Representations and Characters of Groups',
        authors: ['Gordon James', 'Martin Liebeck'],
        edition: '2nd',
        year: 2001,
        why: 'A gentler, widely used undergraduate-friendly introduction that builds up to the same core theorems as Serre.',
      },
    ],
    keyFormulas: [
      { label: 'Representation homomorphism', latex: '\\rho: G \\to GL(V)' },
      { label: 'Character', latex: '\\chi(g) = \\operatorname{tr}(\\rho(g))' },
      { label: 'Character orthogonality relations', latex: '\\frac{1}{|G|}\\sum_{g\\in G}\\chi_i(g)\\overline{\\chi_j(g)}=\\delta_{ij}' },
    ],
    externalRefs: [
      { label: 'Encyclopedia of Mathematics: Character of a representation of a group', url: 'https://encyclopediaofmath.org/wiki/Character_of_a_representation_of_a_group', kind: 'encyclopedia' },
      { label: 'MacTutor: Ferdinand Georg Frobenius', url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Frobenius/', kind: 'reference' },
      { label: 'Wikipedia: Group representation', url: 'https://en.wikipedia.org/wiki/Group_representation', kind: 'encyclopedia' },
    ],
  },
};

const topicUrl = (topicName: string): ExternalRef[] => [
  {
    label: 'Wikipedia reference',
    url: `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(topicName)}`,
    kind: 'encyclopedia',
  },
  {
    label: 'arXiv search',
    url: `https://arxiv.org/search/?query=${encodeURIComponent(topicName)}&searchtype=all`,
    kind: 'arxiv',
  },
];

export const regions: Region[] = regionSeeds.map((field, index) => ({
  id: field.id,
  name: field.name,
  family: field.family,
  x: field.x,
  y: field.y,
  width: field.width,
  height: field.height,
  color: field.color,
  accent: field.accent,
  eraId: field.eraId,
  description: field.description,
  doodle: doodles[index % doodles.length],
}));

const makeTopic = (field: RegionSeed, name: string, index: number): Topic => {
  const id = `${field.id}:${slugify(name)}`;
  const row = Math.floor(index / 3);
  const col = index % 3;
  const x = field.x + 62 + col * ((field.width - 124) / 2);
  const y = field.y + 82 + row * 62;
  const difficulty = difficultyCycle[index % difficultyCycle.length];
  const basePrereqs =
    index === 0 ? [] : [`${field.id}:${slugify(field.topics[Math.max(0, index - 1)])}`];
  const related = [
    `${field.id}:${slugify(field.topics[(index + 1) % field.topics.length])}`,
    field.id === 'calculus'
      ? 'analysis:continuity'
      : field.id === 'analysis'
        ? 'calculus:limits'
        : field.id === 'linear-algebra'
          ? 'optimization:gradient-descent'
          : 'calculus:derivatives',
  ];

  const topic: Topic = {
    id,
    name,
    fieldId: field.id,
    x,
    y,
    difficulty,
    eraId: index < 2 ? field.eraId : difficulty === 'research' ? 'contemporary' : field.eraId,
    tags: field.tags,
    overview: `${name} sits in ${field.name}. It studies the patterns, structures, methods, or invariants that make ${field.description.toLowerCase()}`,
    formal: `${name} is treated here as a structured topic in ${field.name}: identify the objects under study, specify the allowed transformations or operations, and prove statements that are invariant under those choices.`,
    keyIdeas: [
      `${field.name} vocabulary`,
      'examples and counterexamples',
      'invariants',
      'structure-preserving maps',
    ],
    whyItMatters: `${name} is a useful coordinate on the map because it connects technical methods in ${field.name} to neighboring fields and applications.`,
    prerequisites: basePrereqs,
    related,
    learningPath: ['calculus:limits', 'linear-algebra:vector-spaces', ...basePrereqs, id].filter(
      (value, itemIndex, array) => array.indexOf(value) === itemIndex,
    ),
    historicalContext: `${name} belongs to the ${eras.find((era) => era.id === field.eraId)?.name ?? 'modern'} stream, and later work recast it through the language of abstraction, computation, and applications.`,
    contributorIds: [],
    workIds: [],
    exampleProblems: [
      `Give two examples where ${name.toLowerCase()} appears naturally.`,
      `State a central theorem or method involving ${name.toLowerCase()} and explain the hypotheses.`,
      `Find a relationship between ${name.toLowerCase()} and a neighboring topic on the atlas.`,
    ],
    applications: [],
    researchDirections: [
      `Interfaces between ${name.toLowerCase()} and computation`,
      `Classification and structure theorems in ${field.name}`,
      `Connections from ${name.toLowerCase()} to high-dimensional data or modern modeling`,
    ],
    externalRefs: topicUrl(name),
    textbooks: [],
    keyFormulas: [],
    ...topicExtras[id],
  };

  return topic;
};

export const topics: Topic[] = regionSeeds.flatMap((field) =>
  field.topics.map((name, index) => makeTopic(field, name, index)),
);

const personRows = [
  ['Euclid', 'c. 325-c. 265 BCE', 'Hellenistic Alexandria', 'geometry', 'Euclidean geometry and axiomatic exposition'],
  ['Archimedes', 'c. 287-c. 212 BCE', 'Syracuse', 'analysis', 'exhaustion, mechanics, and geometric calculation'],
  ['Apollonius', 'c. 240-c. 190 BCE', 'Perga', 'geometry', 'conic sections'],
  ['Diophantus', 'c. 200-c. 284', 'Alexandria', 'number-theory', 'Diophantine equations'],
  ['Hypatia', 'c. 355-415', 'Alexandria', 'history-of-math', 'commentary and mathematical teaching'],
  ['Aryabhata', '476-550', 'India', 'history-of-math', 'astronomy, trigonometry, and place-value methods'],
  ['Brahmagupta', '598-c. 668', 'India', 'algebra', 'zero, negative numbers, and quadratic equations'],
  ['Bhaskara II', '1114-1185', 'India', 'calculus', 'algebra, astronomy, and early calculus-like reasoning'],
  ['Madhava of Sangamagrama', 'c. 1340-c. 1425', 'Kerala', 'analysis', 'infinite series for trigonometric functions'],
  ['Al-Khwarizmi', 'c. 780-c. 850', 'Persia', 'algebra', 'systematic algebra and algorithms'],
  ['Omar Khayyam', '1048-1131', 'Persia', 'algebra', 'geometric solution of cubic equations'],
  ['Al-Karaji', 'c. 953-c. 1029', 'Persia', 'algebra', 'algebraic powers and induction-like methods'],
  ['Ibn al-Haytham', '965-c. 1040', 'Basra/Cairo', 'geometry', 'optics and geometric analysis'],
  ['Nasir al-Din al-Tusi', '1201-1274', 'Persia', 'geometry', 'trigonometry and astronomy'],
  ['Qin Jiushao', '1202-1261', 'China', 'number-theory', 'Chinese remainder methods and polynomial equations'],
  ['Zhu Shijie', '1249-1314', 'China', 'algebra', 'systems of polynomial equations'],
  ['Fibonacci', 'c. 1170-c. 1250', 'Italy', 'number-theory', 'Liber Abaci and Hindu-Arabic numerals in Europe'],
  ['Gerolamo Cardano', '1501-1576', 'Italy', 'algebra', 'cubic and quartic equations'],
  ['Rafael Bombelli', '1526-1572', 'Italy', 'complex-analysis', 'early complex number arithmetic'],
  ['Francois Viete', '1540-1603', 'France', 'algebra', 'symbolic algebra'],
  ['John Napier', '1550-1617', 'Scotland', 'analysis', 'logarithms'],
  ['Rene Descartes', '1596-1650', 'France', 'geometry', 'analytic geometry'],
  ['Pierre de Fermat', '1607-1665', 'France', 'number-theory', 'number theory and early analytic geometry'],
  ['Blaise Pascal', '1623-1662', 'France', 'probability', 'probability and projective geometry'],
  ['Christiaan Huygens', '1629-1695', 'Netherlands', 'probability', 'early probability and mechanics'],
  ['Isaac Newton', '1642-1727', 'England', 'calculus', 'calculus and mechanics'],
  ['Gottfried Wilhelm Leibniz', '1646-1716', 'Germany', 'calculus', 'calculus notation and symbolic logic'],
  ['Jacob Bernoulli', '1655-1705', 'Switzerland', 'probability', 'law of large numbers'],
  ['Johann Bernoulli', '1667-1748', 'Switzerland', 'calculus-of-variations', 'calculus of variations and differential equations'],
  ['Brook Taylor', '1685-1731', 'England', 'calculus', 'Taylor series and finite differences'],
  ['Leonhard Euler', '1707-1783', 'Switzerland/Russia', 'analysis', 'analysis, graph theory, number theory, and notation'],
  ['Jean le Rond dAlembert', '1717-1783', 'France', 'partial-differential-equations', 'wave equation and mechanics'],
  ['Joseph-Louis Lagrange', '1736-1813', 'Italy/France', 'calculus-of-variations', 'analytical mechanics and variational methods'],
  ['Pierre-Simon Laplace', '1749-1827', 'France', 'probability', 'probability and celestial mechanics'],
  ['Sophie Germain', '1776-1831', 'France', 'number-theory', 'number theory and elasticity'],
  ['Carl Friedrich Gauss', '1777-1855', 'Germany', 'number-theory', 'number theory, geometry, statistics, and algebra'],
  ['Bernard Bolzano', '1781-1848', 'Bohemia', 'real-analysis', 'early rigorous limit concepts and the intermediate value theorem'],
  ['Augustin-Louis Cauchy', '1789-1857', 'France', 'complex-analysis', 'rigor in analysis and complex functions'],
  ['Nikolai Lobachevsky', '1792-1856', 'Russia', 'geometry', 'non-Euclidean geometry'],
  ['Hermann Grassmann', '1809-1877', 'Germany', 'linear-algebra', 'abstract vector spaces and exterior algebra'],
  ['Niels Henrik Abel', '1802-1829', 'Norway', 'abstract-algebra', 'elliptic functions and unsolvability of quintics'],
  ['Evariste Galois', '1811-1832', 'France', 'abstract-algebra', 'Galois theory'],
  ['James Joseph Sylvester', '1814-1897', 'England/USA', 'linear-algebra', 'coining the term "matrix" and invariant theory'],
  ['George Boole', '1815-1864', 'England', 'logic', 'Boolean algebra'],
  ['Karl Weierstrass', '1815-1897', 'Germany', 'real-analysis', 'the modern epsilon-delta definition of limit and rigorous analysis'],
  ['George Gabriel Stokes', '1819-1903', 'Ireland/England', 'calculus', "Stokes' theorem and mathematical physics"],
  ['Arthur Cayley', '1821-1895', 'England', 'linear-algebra', 'matrices and abstract groups'],
  ['Bernhard Riemann', '1826-1866', 'Germany', 'differential-geometry', 'Riemann surfaces and geometry'],
  ['Richard Dedekind', '1831-1916', 'Germany', 'set-theory', 'real numbers and ideals'],
  ['Eugenio Beltrami', '1835-1900', 'Italy', 'linear-algebra', 'early singular value decomposition and non-Euclidean geometry models'],
  ['Camille Jordan', '1838-1922', 'France', 'linear-algebra', 'the Jordan normal form and early singular value decomposition'],
  ['Georg Cantor', '1845-1918', 'Germany', 'set-theory', 'set theory and transfinite numbers'],
  ['Felix Klein', '1849-1925', 'Germany', 'geometry', 'Erlangen program'],
  ['Sofia Kovalevskaya', '1850-1891', 'Russia/Sweden', 'differential-equations', 'PDE and rigid body motion'],
  ['Henri Poincare', '1854-1912', 'France', 'topology', 'topology, dynamics, and celestial mechanics'],
  ['Giuseppe Peano', '1858-1932', 'Italy', 'logic', 'axioms for arithmetic'],
  ['David Hilbert', '1862-1943', 'Germany', 'foundations', 'axioms, Hilbert spaces, and mathematical problems'],
  ['Emmy Noether', '1882-1935', 'Germany/USA', 'abstract-algebra', 'modern algebra and symmetry laws'],
  ['L. E. J. Brouwer', '1881-1966', 'Netherlands', 'foundations', 'intuitionism and topology'],
  ['Hermann Weyl', '1885-1955', 'Germany/USA', 'mathematical-physics', 'symmetry, geometry, and analysis'],
  ['Srinivasa Ramanujan', '1887-1920', 'India', 'number-theory', 'partitions, q-series, and modular forms'],
  ['Stefan Banach', '1892-1945', 'Poland', 'functional-analysis', 'Banach spaces'],
  ['Norbert Wiener', '1894-1964', 'USA', 'harmonic-analysis', 'harmonic analysis, stochastic processes, and cybernetics'],
  ['John von Neumann', '1903-1957', 'Hungary/USA', 'game-theory', 'operator algebras, games, and computing'],
  ['Kurt Godel', '1906-1978', 'Austria/USA', 'logic', 'incompleteness and constructible universe'],
  ['Andre Weil', '1906-1998', 'France/USA', 'algebraic-geometry', 'number theory and algebraic geometry'],
  ['Alan Turing', '1912-1954', 'United Kingdom', 'computation', 'computability and computer science'],
  ['Paul Erdos', '1913-1996', 'Hungary', 'combinatorics', 'combinatorics, graph theory, and number theory'],
  ['Claude Shannon', '1916-2001', 'USA', 'information-theory', 'information theory'],
  ['Katherine Johnson', '1918-2020', 'USA', 'numerical-analysis', 'orbital calculations'],
  ['Julia Robinson', '1919-1985', 'USA', 'logic', 'Hilbert tenth problem'],
  ['Alexander Grothendieck', '1928-2014', 'France', 'algebraic-geometry', 'schemes, toposes, and modern algebraic geometry'],
  ['Michael Atiyah', '1929-2019', 'United Kingdom', 'topology', 'index theory and geometry'],
  ['John Nash', '1928-2015', 'USA', 'game-theory', 'Nash equilibrium and geometry'],
  ['Mikio Sato', '1928-2023', 'Japan', 'analysis', 'hyperfunctions and algebraic analysis'],
  ['Jean-Pierre Serre', '1926-', 'France', 'number-theory', 'algebraic topology, geometry, and number theory'],
  ['Maryam Mirzakhani', '1977-2017', 'Iran/USA', 'dynamical-systems', 'moduli spaces and hyperbolic geometry'],
  ['Karen Uhlenbeck', '1942-', 'USA', 'differential-geometry', 'geometric analysis and gauge theory'],
  ['Terence Tao', '1975-', 'Australia/USA', 'harmonic-analysis', 'analysis, PDE, and additive combinatorics'],
  ['Ingrid Daubechies', '1954-', 'Belgium/USA', 'harmonic-analysis', 'wavelets and signal processing'],
  ['Persi Diaconis', '1945-', 'USA', 'probability', 'probability, statistics, and random walks'],
  ['Andrew Wiles', '1953-', 'United Kingdom', 'number-theory', 'Fermat theorem and modularity'],
  ['Grigori Perelman', '1966-', 'Russia', 'topology', 'Ricci flow and Poincare conjecture'],
  ['Shafi Goldwasser', '1958-', 'USA/Israel', 'cryptography', 'probabilistic encryption and zero knowledge'],
  ['Silvio Micali', '1954-', 'Italy/USA', 'cryptography', 'cryptographic protocols'],
  ['Leslie Lamport', '1941-', 'USA', 'mathematical-logic-cs', 'distributed systems and formal methods'],
  ['Dana Scott', '1932-', 'USA', 'logic', 'domain theory and semantics'],
  ['Dana Angluin', '1944-', 'USA', 'machine-learning-theory', 'learning theory'],
  ['Vladimir Vapnik', '1936-', 'Russia/USA', 'machine-learning-theory', 'statistical learning theory'],
  ['Grace Wahba', '1934-', 'USA', 'statistics', 'splines and statistical learning'],
  ['C. R. Rao', '1920-2023', 'India/USA', 'statistics', 'statistical inference'],
  ['Andrey Kolmogorov', '1903-1987', 'Russia', 'probability', 'axioms of probability and complexity'],
  ['Mark Kac', '1914-1984', 'Poland/USA', 'probability', 'probability and mathematical physics'],
  ['Olga Ladyzhenskaya', '1922-2004', 'Russia', 'partial-differential-equations', 'PDE and fluid mechanics'],
  ['Lars Hormander', '1931-2012', 'Sweden', 'partial-differential-equations', 'linear PDE'],
  ['Shiing-Shen Chern', '1911-2004', 'China/USA', 'differential-geometry', 'global differential geometry'],
  ['Harish-Chandra', '1923-1983', 'India/USA', 'lie-theory', 'representation theory'],
  ['Sophus Lie', '1842-1899', 'Norway', 'lie-theory', 'continuous transformation groups'],
  ['Hassler Whitney', '1907-1989', 'USA', 'differential-geometry', 'manifolds and embeddings'],
  ['Saunders Mac Lane', '1909-2005', 'USA', 'category-theory', 'category theory'],
  ['Samuel Eilenberg', '1913-1998', 'Poland/USA', 'category-theory', 'category theory and algebraic topology'],
  ['William Lawvere', '1937-2023', 'USA', 'category-theory', 'categorical logic'],
  ['Vladimir Voevodsky', '1966-2017', 'Russia/USA', 'proof-assistants', 'homotopy type theory'],
  ['Thierry Coquand', '1961-', 'France/Sweden', 'proof-assistants', 'calculus of constructions'],
  ['Kenneth Appel', '1932-2013', 'USA', 'graph-theory', 'four-color theorem proof'],
  ['Wolfgang Haken', '1928-2022', 'Germany/USA', 'graph-theory', 'four-color theorem proof'],
  ['Ronald Fisher', '1890-1962', 'United Kingdom', 'statistics', 'modern statistics and experimental design'],
  ['Jerzy Neyman', '1894-1981', 'Poland/USA', 'statistics', 'hypothesis testing and confidence intervals'],
  ['Egon Pearson', '1895-1980', 'United Kingdom', 'statistics', 'Neyman-Pearson theory'],
  ['Leonid Kantorovich', '1912-1986', 'Russia', 'optimization', 'linear programming and optimal transport'],
  ['George Dantzig', '1914-2005', 'USA', 'optimization', 'simplex method'],
  ['Richard Bellman', '1920-1984', 'USA', 'control-theory', 'dynamic programming'],
  ['Rudolf Kalman', '1930-2016', 'Hungary/USA', 'control-theory', 'Kalman filtering and control'],
  ['Robert May', '1936-2020', 'Australia/UK', 'mathematical-biology', 'population dynamics'],
  ['S. R. Srinivasa Varadhan', '1940-', 'India/USA', 'probability', 'large deviations'],
  ['Edward Witten', '1951-', 'USA', 'mathematical-physics', 'quantum field theory and topology'],
  ['Roger Penrose', '1931-', 'United Kingdom', 'mathematical-physics', 'relativity and geometry'],
  ['Benoit Mandelbrot', '1924-2010', 'Poland/France/USA', 'dynamical-systems', 'fractals'],
  ['Mitchell Feigenbaum', '1944-2019', 'USA', 'dynamical-systems', 'chaos universality'],
  ['Alonzo Church', '1903-1995', 'USA', 'computation', 'lambda calculus'],
  ['Stephen Kleene', '1909-1994', 'USA', 'logic', 'recursion theory'],
  ['Stephen Cook', '1939-', 'USA/Canada', 'theoretical-cs', 'NP-completeness'],
  ['Richard Karp', '1935-', 'USA', 'theoretical-cs', 'NP-completeness and algorithms'],
  ['Michel Rolle', '1652-1719', 'France', 'analysis', "Rolle's theorem and early Gaussian elimination"],
  ['Thomas Joannes Stieltjes', '1856-1894', 'Netherlands/France', 'analysis', 'the Riemann-Stieltjes integral and continued fractions'],
  ['Maurice Frechet', '1878-1973', 'France', 'analysis', 'abstract metric spaces and point-set topology'],
  ['Emile Borel', '1871-1956', 'France', 'analysis', 'countably additive measure and the Borel hierarchy'],
  ['Henri Lebesgue', '1875-1941', 'France', 'analysis', 'the Lebesgue integral and modern measure theory'],
  ['Ernst Steinitz', '1871-1928', 'Germany', 'algebra', 'the abstract axiomatic theory of fields'],
  ['Ferdinand Georg Frobenius', '1849-1917', 'Germany', 'algebra', 'representation theory and character theory of finite groups'],
] as const;

// Overrides the naive "field's first topic" default below with the actual
// topic id(s) a person is associated with, once that topic has been
// researched. Keyed by person id (person:<slug-of-name>).
const personTopicOverrides: Record<string, string[]> = {
  'person:isaac-newton': ['calculus:derivatives', 'calculus:integrals', 'calculus:limits'],
  'person:gottfried-wilhelm-leibniz': ['calculus:integrals', 'calculus:derivatives'],
  'person:brook-taylor': ['calculus:taylor-series'],
  'person:bernard-bolzano': ['calculus:limits', 'analysis:continuity'],
  'person:karl-weierstrass': ['calculus:limits', 'analysis:sequences-and-series', 'analysis:continuity'],
  'person:george-gabriel-stokes': ['calculus:vector-calculus'],
  'person:augustin-louis-cauchy': [
    'calculus:limits',
    'calculus:integrals',
    'complex-analysis:cauchy-integral-theorem',
    'linear-algebra:determinants',
    'linear-algebra:eigenvalues',
    'linear-algebra:inner-product-spaces',
    'analysis:sequences-and-series',
    'analysis:continuity',
    'analysis:differentiation',
  ],
  'person:arthur-cayley': ['linear-algebra:matrices', 'algebra:groups'],
  'person:james-joseph-sylvester': ['linear-algebra:matrices', 'linear-algebra:singular-value-decomposition'],
  'person:hermann-grassmann': ['linear-algebra:vector-spaces'],
  'person:eugenio-beltrami': ['linear-algebra:singular-value-decomposition'],
  'person:camille-jordan': ['linear-algebra:singular-value-decomposition', 'linear-algebra:eigenvalues', 'algebra:groups'],
  'person:giuseppe-peano': ['logic:propositional-logic', 'linear-algebra:vector-spaces'],
  'person:joseph-louis-lagrange': ['calculus-of-variations:functionals', 'linear-algebra:eigenvalues', 'analysis:differentiation'],
  'person:david-hilbert': [
    'foundations:axiomatic-method',
    'linear-algebra:eigenvalues',
    'linear-algebra:inner-product-spaces',
    'algebra:rings',
    'algebra:modules',
  ],
  'person:john-von-neumann': ['game-theory:normal-form-games', 'linear-algebra:inner-product-spaces'],
  'person:bernhard-riemann': ['analysis:sequences-and-series', 'analysis:integration', 'differential-geometry:riemannian-metrics'],
  'person:georg-cantor': ['set-theory:naive-set-theory', 'analysis:metric-spaces'],
  'person:michel-rolle': ['analysis:differentiation'],
  'person:thomas-joannes-stieltjes': ['analysis:integration'],
  'person:maurice-frechet': ['analysis:metric-spaces', 'analysis:continuity'],
  'person:emile-borel': ['analysis:measure-theory'],
  'person:henri-lebesgue': ['analysis:measure-theory'],
  'person:andrey-kolmogorov': ['probability:sample-spaces', 'analysis:measure-theory'],
  'person:evariste-galois': ['abstract-algebra:galois-theory', 'algebra:polynomials', 'algebra:fields', 'algebra:groups'],
  'person:emmy-noether': ['abstract-algebra:group-theory', 'algebra:rings', 'algebra:modules'],
  'person:richard-dedekind': ['set-theory:naive-set-theory', 'algebra:rings', 'algebra:modules'],
  'person:hermann-weyl': ['mathematical-physics:classical-mechanics', 'algebra:representations'],
  'person:ernst-steinitz': ['algebra:fields'],
  'person:ferdinand-georg-frobenius': ['algebra:representations'],
};

export const people: Person[] = personRows.map(
  ([name, lifespan, region, fieldId, contribution]) => {
    const field = regionSeeds.find((item) => item.id === fieldId) ?? regionSeeds[0];
    const id = `person:${slugify(name)}`;
    const firstTopic = `${field.id}:${slugify(field.topics[0])}`;

    return {
      id,
      name,
      lifespan,
      region,
      fieldIds: [field.id],
      majorContributions: [contribution],
      associatedTopicIds: personTopicOverrides[id] ?? [firstTopic],
      notableWorkIds: [],
      historicalContext: `${name} is placed near ${field.name} because of work on ${contribution}.`,
      refs: [
        {
          label: 'MacTutor or encyclopedia reference',
          url: `https://mathshistory.st-andrews.ac.uk/Search/?query=${encodeURIComponent(name)}`,
          kind: 'reference',
        },
      ],
    };
  },
);

const workRows = [
  ['Elements', 'Euclid', -300, 'geometry', 'An axiomatic synthesis of Greek geometry and number theory.'],
  ['The Method of Mechanical Theorems', 'Archimedes', -200, 'analysis', 'A model of geometric discovery using mechanical intuition.'],
  ['Conics', 'Apollonius', -200, 'geometry', 'The classical theory of conic sections.'],
  ['Arithmetica', 'Diophantus', 250, 'number-theory', 'A landmark collection of algebraic number problems.'],
  ['Aryabhatiya', 'Aryabhata', 499, 'history-of-math', 'A compact Sanskrit astronomical and mathematical treatise.'],
  ['Brahmasphutasiddhanta', 'Brahmagupta', 628, 'algebra', 'Rules for zero, negative numbers, and equations.'],
  ['Al-Kitab al-mukhtasar fi hisab al-jabr wal-muqabala', 'Al-Khwarizmi', 820, 'algebra', 'Helped establish algebra as a systematic discipline.'],
  ['Liber Abaci', 'Fibonacci', 1202, 'number-theory', 'Popularized Hindu-Arabic numerals in Europe.'],
  ['Lilavati', 'Bhaskara II', 1150, 'algebra', 'Influential mathematical problems and methods.'],
  ['Ars Magna', 'Gerolamo Cardano', 1545, 'algebra', 'Published solutions to cubic and quartic equations.'],
  ['La Geometrie', 'Rene Descartes', 1637, 'geometry', 'Merged algebra with geometry through coordinates.'],
  ['De ratiociniis in ludo aleae', 'Christiaan Huygens', 1657, 'probability', 'One of the first formal texts on probability.'],
  ['Philosophiae Naturalis Principia Mathematica', 'Isaac Newton', 1687, 'mathematical-physics', 'Unified mechanics and mathematical physics.'],
  ['Ars Conjectandi', 'Jacob Bernoulli', 1713, 'probability', 'Introduced the law of large numbers.'],
  ['Introductio in analysin infinitorum', 'Leonhard Euler', 1748, 'analysis', 'Shaped modern analysis and notation.'],
  ['Theoria motus corporum coelestium', 'Carl Friedrich Gauss', 1809, 'statistics', 'Least squares and celestial mechanics.'],
  ['Disquisitiones Arithmeticae', 'Carl Friedrich Gauss', 1801, 'number-theory', 'Founded modern number theory.'],
  ['Cours dAnalyse', 'Augustin-Louis Cauchy', 1821, 'real-analysis', 'A milestone in rigorous analysis.'],
  ['The Mathematical Analysis of Logic', 'George Boole', 1847, 'logic', 'A foundation for Boolean algebra.'],
  ['A Memoir on the Theory of Matrices', 'Arthur Cayley', 1858, 'linear-algebra', 'The first treatment of matrices as independent algebraic objects, defining matrix addition, multiplication, and inverses.'],
  ['Die lineale Ausdehnungslehre', 'Hermann Grassmann', 1844, 'linear-algebra', 'The first abstract, coordinate-free calculus of n-dimensional vector spaces and exterior (wedge) products.'],
  ['Uber die Hypothesen welche der Geometrie zu Grunde liegen', 'Bernhard Riemann', 1854, 'differential-geometry', 'Introduced Riemannian geometry.'],
  ['Memoire sur les conditions de resolubilite des equations par radicaux', 'Evariste Galois', 1846, 'abstract-algebra', 'Founded Galois theory.'],
  ['Beitrage zur Begrundung der transfiniten Mengenlehre', 'Georg Cantor', 1895, 'set-theory', 'Established transfinite set theory.'],
  ['Grundlagen der Geometrie', 'David Hilbert', 1899, 'foundations', 'Modern axiomatization of geometry.'],
  ['Mathematische Probleme', 'David Hilbert', 1900, 'foundations', 'A research agenda for 20th-century mathematics.'],
  ['Principia Mathematica', 'Whitehead and Russell', 1910, 'logic', 'A major formalist foundation project.'],
  ['Uber formal unentscheidbare Satze', 'Kurt Godel', 1931, 'logic', 'Incompleteness changed foundations permanently.'],
  ['On Computable Numbers', 'Alan Turing', 1936, 'computation', 'Defined Turing machines and computability.'],
  ['A Mathematical Theory of Communication', 'Claude Shannon', 1948, 'information-theory', 'Founded information theory.'],
  ['Theory of Games and Economic Behavior', 'von Neumann and Morgenstern', 1944, 'game-theory', 'Established modern game theory.'],
  ['Foundations of Economic Analysis', 'Paul Samuelson', 1947, 'optimization', 'Spread optimization through economics.'],
  ['Cybernetics', 'Norbert Wiener', 1948, 'control-theory', 'Linked control, communication, and feedback.'],
  ['The General Theory of Employment, Interest and Money', 'John Maynard Keynes', 1936, 'mathematical-finance', 'A historical economics anchor for later modeling.'],
  ['Methods of Mathematical Physics', 'Courant and Hilbert', 1924, 'mathematical-physics', 'Canonical analysis and physics reference.'],
  ['Linear Operators', 'Dunford and Schwartz', 1958, 'functional-analysis', 'A broad functional analysis reference.'],
  ['Homological Algebra', 'Cartan and Eilenberg', 1956, 'abstract-algebra', 'Organized homological methods.'],
  ['Categories for the Working Mathematician', 'Saunders Mac Lane', 1971, 'category-theory', 'Made category theory a standard language.'],
  ['EGA', 'Grothendieck and Dieudonne', 1960, 'algebraic-geometry', 'Rebuilt algebraic geometry through schemes.'],
  ['SGA', 'Grothendieck school', 1960, 'algebraic-geometry', 'Developed cohomology, fundamental groups, and topos methods.'],
  ['The Large Scale Structure of Space-Time', 'Hawking and Ellis', 1973, 'mathematical-physics', 'A geometric account of relativity.'],
  ['The Feynman Lectures on Physics', 'Feynman, Leighton, Sands', 1964, 'mathematical-physics', 'Influential mathematical physics exposition.'],
  ['The Theory of Error-Correcting Codes', 'MacWilliams and Sloane', 1977, 'information-theory', 'A landmark coding theory text.'],
  ['Computers and Intractability', 'Garey and Johnson', 1979, 'theoretical-cs', 'Popularized NP-completeness.'],
  ['The Probabilistic Method', 'Alon and Spencer', 1992, 'probabilistic-method', 'Systematized probabilistic combinatorics.'],
  ['Random Graphs', 'Bela Bollobas', 1985, 'graph-theory', 'A central text on random graph theory.'],
  ['Graph Theory', 'Reinhard Diestel', 1997, 'graph-theory', 'Widely used modern graph theory text.'],
  ['Convex Optimization', 'Boyd and Vandenberghe', 2004, 'optimization', 'A standard modern optimization reference.'],
  ['Numerical Linear Algebra', 'Trefethen and Bau', 1997, 'numerical-analysis', 'A compact influential numerical text.'],
  ['Finite Element Procedures', 'Klaus-Jurgen Bathe', 1996, 'numerical-analysis', 'A major FEM engineering reference.'],
  ['Stochastic Calculus for Finance', 'Steven Shreve', 2004, 'mathematical-finance', 'A standard mathematical finance text.'],
  ['The Fractal Geometry of Nature', 'Benoit Mandelbrot', 1982, 'dynamical-systems', 'Popularized fractal geometry.'],
  ['Nonlinear Dynamics and Chaos', 'Steven Strogatz', 1994, 'dynamical-systems', 'A modern entry point to dynamics.'],
  ['Mathematical Biology', 'J. D. Murray', 1989, 'mathematical-biology', 'A major text in mathematical biology.'],
  ['Elements of Statistical Learning', 'Hastie, Tibshirani, Friedman', 2001, 'statistics', 'Statistical learning synthesis.'],
  ['Pattern Recognition and Machine Learning', 'Christopher Bishop', 2006, 'machine-learning-theory', 'Probabilistic machine learning reference.'],
  ['Understanding Machine Learning', 'Shalev-Shwartz and Ben-David', 2014, 'machine-learning-theory', 'Learning theory textbook.'],
  ['Introduction to Algorithms', 'Cormen, Leiserson, Rivest, Stein', 1990, 'computation', 'Canonical algorithms text.'],
  ['Concrete Mathematics', 'Graham, Knuth, Patashnik', 1989, 'discrete-math', 'Discrete mathematics for computing.'],
  ['The Art of Computer Programming', 'Donald Knuth', 1968, 'computation', 'A monumental algorithmic reference.'],
  ['Types and Programming Languages', 'Benjamin Pierce', 2002, 'mathematical-logic-cs', 'Type systems and semantics.'],
  ['Introduction to Automata Theory, Languages, and Computation', 'Hopcroft, Motwani, Ullman', 1979, 'theoretical-cs', 'Core automata and computation text.'],
  ['Introduction to the Theory of Computation', 'Michael Sipser', 1997, 'theoretical-cs', 'Standard theoretical CS text.'],
  ['Modern Cryptography, Probabilistic Proofs and Pseudorandomness', 'Oded Goldreich', 1998, 'cryptography', 'A rigorous cryptography text.'],
  ['Introduction to Modern Cryptography', 'Katz and Lindell', 2007, 'cryptography', 'Widely used modern cryptography textbook.'],
  ['Proofs and Types', 'Jean-Yves Girard', 1989, 'proof-assistants', 'A bridge between proof theory and type theory.'],
  ['Homotopy Type Theory', 'Univalent Foundations Program', 2013, 'proof-assistants', 'A manifesto for univalent foundations.'],
  ['Algebraic Topology', 'Allen Hatcher', 2002, 'topology', 'Widely used algebraic topology text.'],
  ['Topology from the Differentiable Viewpoint', 'John Milnor', 1965, 'differential-geometry', 'Classic differential topology exposition.'],
  ['Morse Theory', 'John Milnor', 1963, 'differential-geometry', 'Connected topology, critical points, and geometry.'],
  ['Fourier Analysis', 'Stein and Shakarchi', 2003, 'harmonic-analysis', 'Modern harmonic analysis introduction.'],
  ['Singular Integrals and Differentiability Properties of Functions', 'Elias Stein', 1970, 'harmonic-analysis', 'A landmark in harmonic analysis.'],
  ['Partial Differential Equations', 'Lawrence Evans', 1998, 'partial-differential-equations', 'Standard graduate PDE text.'],
  ['Linear Partial Differential Operators', 'Lars Hormander', 1963, 'partial-differential-equations', 'A foundational PDE treatise.'],
  ['Methods of Information Geometry', 'Amari and Nagaoka', 2000, 'statistics', 'Geometry of statistical models.'],
  ['Optimal Transport: Old and New', 'Cedric Villani', 2009, 'optimization', 'Modern optimal transport synthesis.'],
  ['Winning Ways for your Mathematical Plays', 'Berlekamp, Conway, Guy', 1982, 'game-theory', 'Combinatorial game theory classic.'],
  ['A Course in Arithmetic', 'Jean-Pierre Serre', 1973, 'number-theory', 'A compact bridge to modern arithmetic.'],
  ['Linear Algebra and Its Applications', 'Gilbert Strang', 1976, 'linear-algebra', 'Influential applied linear algebra text.'],
  ['Naive Set Theory', 'Paul Halmos', 1960, 'set-theory', 'A concise set theory introduction.'],
  ['Model Theory', 'C. C. Chang and H. J. Keisler', 1973, 'logic', 'A standard model theory reference.'],
  ['Introduction to Lie Algebras and Representation Theory', 'James Humphreys', 1972, 'lie-theory', 'A compact Lie theory reference.'],
] as const;

// Same idea as personTopicOverrides: replaces the default "field's first
// topic" placement with the topic(s) a work actually belongs to.
const workTopicOverrides: Record<string, string[]> = {
  'work:cours-danalyse': ['calculus:limits', 'real-analysis:epsilon-delta-limits', 'analysis:sequences-and-series', 'analysis:continuity'],
  'work:introductio-in-analysin-infinitorum': ['calculus:taylor-series', 'analysis:sequences-and-series'],
  'work:a-memoir-on-the-theory-of-matrices': ['linear-algebra:matrices', 'linear-algebra:determinants', 'linear-algebra:eigenvalues'],
  'work:die-lineale-ausdehnungslehre': ['linear-algebra:vector-spaces'],
  'work:linear-algebra-and-its-applications': ['linear-algebra:vector-spaces'],
  'work:numerical-linear-algebra': ['numerical-analysis:floating-point-arithmetic', 'linear-algebra:singular-value-decomposition'],
  'work:memoire-sur-les-conditions-de-resolubilite-des-equations-par-radicaux': [
    'abstract-algebra:galois-theory',
    'algebra:polynomials',
    'algebra:fields',
    'algebra:groups',
  ],
};

export const works: Work[] = workRows.map(([title, authors, year, fieldId, why]) => {
  const field = regionSeeds.find((item) => item.id === fieldId) ?? regionSeeds[0];
  const id = `work:${slugify(title)}`;
  return {
    id,
    title,
    authors: authors.split(' and '),
    year,
    fieldId: field.id,
    whyItMattered: why,
    associatedTopicIds: workTopicOverrides[id] ?? [`${field.id}:${slugify(field.topics[0])}`],
    citation: `${authors}. ${title}. ${year}.`,
    link: `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(title)}`,
  };
});

export const applications: ApplicationDomain[] = [
  {
    id: 'physics-engineering',
    name: 'Physics and engineering',
    summary: 'Differential equations, geometry, optimization, and numerical methods model physical systems.',
    topicIds: ['differential-equations:ordinary-differential-equations', 'mathematical-physics:hamiltonian-systems', 'numerical-analysis:finite-element-method'],
  },
  {
    id: 'data-ai',
    name: 'Data science and AI',
    summary: 'Statistics, optimization, linear algebra, probability, and learning theory shape modern machine learning.',
    topicIds: ['statistics:regression', 'optimization:gradient-descent', 'machine-learning-theory:generalization-bounds'],
  },
  {
    id: 'security',
    name: 'Security and privacy',
    summary: 'Cryptography converts number theory, algebra, probability, and complexity into secure protocols.',
    topicIds: ['cryptography:public-key-cryptography', 'cryptography:zero-knowledge-proofs', 'number-theory:modular-arithmetic'],
  },
  {
    id: 'biology-medicine',
    name: 'Biology and medicine',
    summary: 'Models of epidemics, populations, networks, inference, and differential equations support life sciences.',
    topicIds: ['mathematical-biology:epidemic-models', 'probability:markov-chains', 'statistics:causal-inference'],
  },
  {
    id: 'finance-risk',
    name: 'Finance and risk',
    summary: 'Stochastic processes, optimization, statistics, and PDE appear in pricing, risk, and markets.',
    topicIds: ['mathematical-finance:black-scholes-equation', 'probability:random-variables', 'optimization:convex-optimization'],
  },
  {
    id: 'networks',
    name: 'Networks and infrastructure',
    summary: 'Graph theory, operations research, queues, flows, and control theory help analyze connected systems.',
    topicIds: ['graph-theory:network-flows', 'operations-research:queueing-theory', 'control-theory:feedback-systems'],
  },
  {
    id: 'communication',
    name: 'Communication',
    summary: 'Information theory and coding explain compression, transmission, redundancy, and noise.',
    topicIds: ['information-theory:entropy', 'information-theory:error-correcting-codes', 'harmonic-analysis:fourier-transform'],
  },
  {
    id: 'education',
    name: 'Education',
    summary: 'Learning progressions, representations, proof, and modeling shape how mathematics is taught.',
    topicIds: ['math-education:learning-progressions', 'math-education:proof-pedagogy', 'history-of-math:greek-deductive-mathematics'],
  },
];

const appByTopic = new Map(
  applications.flatMap((app) => app.topicIds.map((topicId) => [topicId, app.name] as const)),
);

// Topics with real, researched contributorIds/workIds/applications (set via
// topicExtras) keep them; this only fills in the generic defaults for
// topics that haven't been researched yet.
topics.forEach((topic) => {
  if (topic.contributorIds.length === 0) {
    const peopleForField = people.filter((person) => person.fieldIds.includes(topic.fieldId));
    topic.contributorIds = peopleForField.slice(0, 4).map((person) => person.id);
  }
  if (topic.workIds.length === 0) {
    const worksForField = works.filter((work) => work.fieldId === topic.fieldId);
    topic.workIds = worksForField.slice(0, 3).map((work) => work.id);
  }
  if (topic.applications.length === 0) {
    topic.applications = appByTopic.has(topic.id)
      ? [appByTopic.get(topic.id) as string]
      : topic.tags.includes('applied') || topic.tags.includes('computational')
        ? ['modeling', 'simulation', 'data analysis']
        : ['theory building', 'proof methods', 'mathematical language'];
  }
});

people.forEach((person) => {
  person.notableWorkIds = works
    .filter((work) => person.fieldIds.includes(work.fieldId))
    .slice(0, 2)
    .map((work) => work.id);
});

const topicIds = topics.map((topic) => topic.id);
const topicById = new Map(topics.map((topic) => [topic.id, topic]));

const generatedRelationships: Relationship[] = [];

for (const field of regionSeeds) {
  const ids = field.topics.map((name) => `${field.id}:${slugify(name)}`);
  for (let index = 1; index < ids.length; index += 1) {
    generatedRelationships.push({
      id: `rel:${ids[index - 1]}:${ids[index]}:prereq`,
      sourceId: ids[index - 1],
      targetId: ids[index],
      type: 'prerequisite',
      label: `${field.topics[index - 1]} prepares ${field.topics[index]}`,
    });
  }
}

const crossLinks: Array<[string, string, RelationshipType, string]> = [
  ['calculus:derivatives', 'differential-equations:ordinary-differential-equations', 'prerequisite', 'Rates become equations.'],
  ['calculus:integrals', 'probability:expectation', 'applied-in', 'Accumulation becomes expected value.'],
  ['linear-algebra:vector-spaces', 'functional-analysis:normed-spaces', 'generalized-by', 'Infinite-dimensional analysis generalizes vectors.'],
  ['linear-algebra:eigenvalues', 'dynamical-systems:fixed-points', 'related-to', 'Linearization studies local behavior.'],
  ['abstract-algebra:galois-theory', 'number-theory:algebraic-number-theory', 'related-to', 'Field extensions meet arithmetic.'],
  ['commutative-algebra:ideals', 'algebraic-geometry:affine-varieties', 'example-of', 'Polynomial ideals encode varieties.'],
  ['topology:manifolds', 'differential-geometry:smooth-manifolds', 'prerequisite', 'Smooth manifolds add calculus to topology.'],
  ['complex-analysis:riemann-surfaces', 'algebraic-geometry:projective-varieties', 'related-to', 'Curves bridge complex analysis and algebraic geometry.'],
  ['probability:markov-chains', 'statistics:bayesian-inference', 'applied-in', 'Stochastic transitions support inference.'],
  ['statistics:regression', 'machine-learning-theory:generalization-bounds', 'related-to', 'Prediction requires error control.'],
  ['graph-theory:network-flows', 'optimization:linear-programming', 'example-of', 'Flows are canonical linear programs.'],
  ['number-theory:modular-arithmetic', 'cryptography:rsa', 'applied-in', 'Modular arithmetic powers RSA.'],
  ['logic:predicate-logic', 'mathematical-logic-cs:model-checking', 'applied-in', 'Formal logic verifies systems.'],
  ['category-theory:adjunctions', 'proof-assistants:type-theory', 'related-to', 'Categorical structure informs type theory.'],
  ['information-theory:entropy', 'statistics:bayesian-inference', 'related-to', 'Information quantifies uncertainty.'],
  ['partial-differential-equations:sobolev-spaces', 'functional-analysis:distributions', 'related-to', 'Weak derivatives use functional analysis.'],
  ['harmonic-analysis:fourier-transform', 'partial-differential-equations:heat-equation', 'applied-in', 'Frequencies solve linear PDE.'],
  ['lie-theory:lie-groups', 'mathematical-physics:gauge-theory', 'applied-in', 'Symmetry organizes fields.'],
  ['game-theory:nash-equilibrium', 'mathematical-biology:evolutionary-game-theory', 'applied-in', 'Equilibria model evolution.'],
  ['optimization:convex-optimization', 'mathematical-finance:portfolio-theory', 'applied-in', 'Optimization allocates risk.'],
  ['control-theory:state-space-models', 'dynamical-systems:phase-portraits', 'related-to', 'Both describe evolution in state space.'],
  ['probabilistic-method:random-graphs', 'graph-theory:paths-and-cycles', 'related-to', 'Randomness probes graph structure.'],
  ['combinatorics:generating-functions', 'discrete-math:recurrence-relations', 'related-to', 'Generating functions solve recurrences.'],
  ['theoretical-cs:p-versus-np', 'cryptography:post-quantum-cryptography', 'historically-influenced', 'Hardness assumptions shape cryptography.'],
  ['proof-assistants:lean', 'foundations:proof-theory', 'applied-in', 'Proof theory becomes checked code.'],
  ['set-theory:ordinals', 'logic:incompleteness-theorems', 'related-to', 'Ordinal analysis measures proof strength.'],
  ['calculus:limits', 'real-analysis:epsilon-delta-limits', 'generalized-by', 'Real analysis makes the epsilon-delta definition fully rigorous and general.'],
  ['calculus:taylor-series', 'complex-analysis:holomorphic-functions', 'related-to', 'Functions equal to their Taylor series become holomorphic in the complex setting.'],
  ['calculus:multivariable-calculus', 'optimization:gradient-descent', 'applied-in', 'Gradients drive iterative optimization.'],
  ['calculus:vector-calculus', 'partial-differential-equations:heat-equation', 'applied-in', 'Divergence and curl formulate continuum PDE.'],
];

export const relationships: Relationship[] = [
  ...generatedRelationships,
  ...crossLinks
    .filter(([sourceId, targetId]) => topicById.has(sourceId) && topicById.has(targetId))
    .map(([sourceId, targetId, type, label]) => ({
      id: `rel:${sourceId}:${targetId}:${type}`,
      sourceId,
      targetId,
      type,
      label,
    })),
];

export const atlasStats = {
  topics: topics.length,
  regions: regions.length,
  people: people.length,
  works: works.length,
  relationships: relationships.length,
  eras: eras.length,
  applications: applications.length,
  ids: topicIds.length,
};

