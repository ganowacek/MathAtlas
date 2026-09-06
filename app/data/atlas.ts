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
  'calculus:derivatives': {
    formal:
      'For a function f, the derivative at a is the limit lim_{h->0} (f(a+h)-f(a))/h when that limit exists.',
    keyIdeas: ['rate of change', 'linear approximation', 'chain rule', 'optimization'],
  },
  'linear-algebra:eigenvalues': {
    formal:
      'A scalar lambda is an eigenvalue of a linear map T when there is a nonzero vector v with T(v)=lambda v.',
    keyIdeas: ['invariant directions', 'spectra', 'diagonalization', 'dynamical modes'],
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
  ['Leonhard Euler', '1707-1783', 'Switzerland/Russia', 'analysis', 'analysis, graph theory, number theory, and notation'],
  ['Jean le Rond dAlembert', '1717-1783', 'France', 'partial-differential-equations', 'wave equation and mechanics'],
  ['Joseph-Louis Lagrange', '1736-1813', 'Italy/France', 'calculus-of-variations', 'analytical mechanics and variational methods'],
  ['Pierre-Simon Laplace', '1749-1827', 'France', 'probability', 'probability and celestial mechanics'],
  ['Sophie Germain', '1776-1831', 'France', 'number-theory', 'number theory and elasticity'],
  ['Carl Friedrich Gauss', '1777-1855', 'Germany', 'number-theory', 'number theory, geometry, statistics, and algebra'],
  ['Augustin-Louis Cauchy', '1789-1857', 'France', 'complex-analysis', 'rigor in analysis and complex functions'],
  ['Nikolai Lobachevsky', '1792-1856', 'Russia', 'geometry', 'non-Euclidean geometry'],
  ['Niels Henrik Abel', '1802-1829', 'Norway', 'abstract-algebra', 'elliptic functions and unsolvability of quintics'],
  ['Evariste Galois', '1811-1832', 'France', 'abstract-algebra', 'Galois theory'],
  ['George Boole', '1815-1864', 'England', 'logic', 'Boolean algebra'],
  ['Arthur Cayley', '1821-1895', 'England', 'linear-algebra', 'matrices and abstract groups'],
  ['Bernhard Riemann', '1826-1866', 'Germany', 'differential-geometry', 'Riemann surfaces and geometry'],
  ['Richard Dedekind', '1831-1916', 'Germany', 'set-theory', 'real numbers and ideals'],
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
] as const;

export const people: Person[] = personRows.map(
  ([name, lifespan, region, fieldId, contribution]) => {
    const field = regionSeeds.find((item) => item.id === fieldId) ?? regionSeeds[0];
    const firstTopic = `${field.id}:${slugify(field.topics[0])}`;

    return {
      id: `person:${slugify(name)}`,
      name,
      lifespan,
      region,
      fieldIds: [field.id],
      majorContributions: [contribution],
      associatedTopicIds: [firstTopic],
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

export const works: Work[] = workRows.map(([title, authors, year, fieldId, why]) => {
  const field = regionSeeds.find((item) => item.id === fieldId) ?? regionSeeds[0];
  return {
    id: `work:${slugify(title)}`,
    title,
    authors: authors.split(' and '),
    year,
    fieldId: field.id,
    whyItMattered: why,
    associatedTopicIds: [`${field.id}:${slugify(field.topics[0])}`],
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

topics.forEach((topic) => {
  const peopleForField = people.filter((person) => person.fieldIds.includes(topic.fieldId));
  const worksForField = works.filter((work) => work.fieldId === topic.fieldId);
  topic.contributorIds = peopleForField.slice(0, 4).map((person) => person.id);
  topic.workIds = worksForField.slice(0, 3).map((work) => work.id);
  topic.applications = appByTopic.has(topic.id)
    ? [appByTopic.get(topic.id) as string]
    : topic.tags.includes('applied') || topic.tags.includes('computational')
      ? ['modeling', 'simulation', 'data analysis']
      : ['theory building', 'proof methods', 'mathematical language'];
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

