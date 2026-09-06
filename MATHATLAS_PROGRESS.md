# MathAtlas content research progress

Tracks per-field completion of deep-researched `topicExtras` overrides in
`app/data/atlas.ts` (overview, formal LaTeX, keyIdeas, whyItMatters,
historicalContext, exampleProblems, applications, researchDirections,
contributorIds, workIds, textbooks, keyFormulas, externalRefs).

Legend: `[x]` fully researched, `[~]` partially done, `[ ]` still template-generated.

Priority order per task brief: calculus, linear-algebra, analysis, algebra,
probability, topology, number-theory, then remaining 40 fields.

## Priority fields

- [x] calculus — Limits, Derivatives, Integrals, Taylor series, Multivariable calculus, Vector calculus
- [x] linear-algebra — Vector spaces, Matrices, Determinants, Eigenvalues, Inner product spaces, Singular value decomposition
- [x] analysis — Sequences and series, Continuity, Differentiation, Integration, Metric spaces, Measure theory
- [x] algebra — Polynomials, Groups, Rings, Fields, Modules, Representations
- [ ] probability — Sample spaces, Random variables, Expectation, Law of large numbers, Central limit theorem, Markov chains
- [ ] topology — Point-set topology, Compactness, Connectedness, Homotopy, Homology, Manifolds
- [ ] number-theory — Prime numbers, Modular arithmetic, Diophantine equations, Algebraic number theory, Analytic number theory, Modular forms

## Remaining fields (40)

- [ ] foundations
- [ ] logic
- [ ] set-theory
- [ ] category-theory
- [ ] abstract-algebra
- [ ] commutative-algebra
- [ ] algebraic-geometry
- [ ] geometry
- [ ] differential-geometry
- [ ] real-analysis
- [ ] complex-analysis
- [ ] functional-analysis
- [ ] differential-equations
- [ ] dynamical-systems
- [ ] statistics
- [ ] discrete-math
- [ ] combinatorics
- [ ] graph-theory
- [ ] computation
- [ ] theoretical-cs
- [ ] cryptography
- [ ] optimization
- [ ] game-theory
- [ ] mathematical-physics
- [ ] numerical-analysis
- [ ] mathematical-finance
- [ ] mathematical-biology
- [ ] control-theory
- [ ] information-theory
- [ ] calculus-of-variations
- [ ] partial-differential-equations
- [ ] harmonic-analysis
- [ ] lie-theory
- [ ] probabilistic-method
- [ ] machine-learning-theory
- [ ] proof-assistants
- [ ] history-of-math
- [ ] math-education
- [ ] operations-research
- [ ] mathematical-logic-cs

## Notes

- Data model (`Textbook`, `KeyFormula` types, `textbooks`/`keyFormulas` fields
  on `Topic`) and KaTeX rendering in `MathAtlasApp.tsx` are already built —
  no further infra work needed, only content.
- When finishing a field, also fix `personTopicOverrides` /
  `workTopicOverrides` (~atlas.ts:1648, ~atlas.ts:1787) so contributors and
  works point at the specific topic they belong to, and add new
  `person`/`work` rows for any key figure or canonical text not yet present.
- After each field: `npx tsc --noEmit` and check `validateAtlasData()`
  (app/lib/atlas-utils.ts) for referential integrity.
