# MathAtlas content research progress

Tracks per-field completion of deep-researched `topicExtras` overrides in
`app/data/atlas.ts` (overview, formal LaTeX, keyIdeas, whyItMatters,
historicalContext, exampleProblems, applications, researchDirections,
contributorIds, workIds, textbooks, keyFormulas, externalRefs).

Legend: `[x]` fully researched, `[~]` partially done, `[ ]` still template-generated.

Priority order per task brief: calculus, linear-algebra, analysis, algebra,
probability, topology, number-theory, then remaining 40 fields.

All 7 priority fields are now complete (42 of 282 topics researched).
Next: work through the remaining 40 fields in any reasonable order.

## Priority fields

- [x] calculus — Limits, Derivatives, Integrals, Taylor series, Multivariable calculus, Vector calculus
- [x] linear-algebra — Vector spaces, Matrices, Determinants, Eigenvalues, Inner product spaces, Singular value decomposition
- [x] analysis — Sequences and series, Continuity, Differentiation, Integration, Metric spaces, Measure theory
- [x] algebra — Polynomials, Groups, Rings, Fields, Modules, Representations
- [x] probability — Sample spaces, Random variables, Expectation, Law of large numbers, Central limit theorem, Markov chains
- [x] topology — Point-set topology, Compactness, Connectedness, Homotopy, Homology, Manifolds
- [x] number-theory — Prime numbers, Modular arithmetic, Diophantine equations, Algebraic number theory, Analytic number theory, Modular forms

## Remaining fields (40)

- [x] foundations
- [x] logic
- [x] set-theory
- [x] category-theory
- [x] abstract-algebra
- [x] commutative-algebra
- [x] algebraic-geometry
- [x] geometry
- [x] differential-geometry
- [x] real-analysis
- [x] complex-analysis
- [x] functional-analysis
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
