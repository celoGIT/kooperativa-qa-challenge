Requirements Breakdown (Checklist):

- [✔]Tech Stack: Playwright, TypeScript, Page Object Model (POM).
- [✔]Test Target: Verejne dostupný e-shop (podľa vlastného výberu).
- [ ]Test Data: Hľadaný tovar, musí byť parametrizovaný a načítaný z externého súboru (.json).
- [ ]Positive E2E Scenario: Vyhľadanie špecifického tovaru, vloženie do košíka a validácia obsahu košíka.
- [ ]Negative Scenario: Interakcia s neexistujúcim alebo nedostupným tovarom a validácia očakávaného chybového stavu.
- [ ]CI/CD Integration: Konfigurácia automatizovanej pipeline (napr. GitHub Actions) pre automatické spustenie testov pri nahratí kódu.
- [ ]Reporting: Generovanie a uloženie reportu o výsledku testov z pipeline.
- [ ]Dokumentácia: Súhrn zvoleného prístupu, architektúry, prekážok a technických rozhodnutí v README.

Poznámky:
Verejne dostupný e-shop - zvolil som si demoblaze.com, predchadzam tak problemom s anti-bot ochranou a vyhybam sa neocakavanym zmenam na landing page - pop-up reklama, dotazniky, zlavove kupony pre prvy nakup a pod.

