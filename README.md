# Better Move Massage — strona WWW

Wersja gotowa do publikacji jako **statyczna strona na Vercel**, przygotowana dla `better-move.pl`.

## Zawartość

- `index.html` — cała strona (SEO, polska treść, oferta, cennik, kontakt i dojazd).
- `styles.css` — osobne, responsywne widoki telefonu, tabletu i komputera.
- `script.js` — mobilne menu i wskazanie bieżącej sekcji.
- `assets/` — grafika hero, logo, ikona strony i obraz podglądu społecznościowego.
- `vercel.json`, `robots.txt`, `sitemap.xml` — pliki konfiguracji i SEO.

Strona działa **bez budowania i bez npm**. Rezerwacja odbywa się przez przyciski `tel:+48784340292`.

## Jak zastąpić obecną stronę o automatyzacji AI na better-move.pl

Ta operacja jest **podmianą dotychczasowej witryny**, nie tworzy drugiej strony na innej domenie.

1. Zaloguj się na [Vercel Dashboard](https://vercel.com/dashboard) i otwórz projekt, do którego podłączona jest domena `better-move.pl` (Settings → Domains). Sprawdź również `www.better-move.pl`.
2. **Zabezpiecz starą wersję**: historia Deployments w Vercel umożliwia rollback; dla pewności skopiuj obecne repozytorium przed zmianami.
3. Jeśli projekt jest podłączony do GitHub/GitLab/Bitbucket: zastąp pliki repozytorium produkcyjnego plikami z tego katalogu. W ustawieniach Vercel ustaw **Framework Preset: Other**, **Root Directory** na katalog zawierający `index.html`, **Build Command** pozostaw puste i **Output Directory** pozostaw puste (statyczne pliki z katalogu głównego). Commit i push do gałęzi produkcyjnej (zwykle `main`) opublikują nową wersję.
4. Jeśli projekt nie korzysta z Git: otwórz katalog z tą stroną na swoim komputerze, zainstaluj [Vercel CLI](https://vercel.com/docs/cli) i uruchom `npx vercel link`, wybierając **istniejący projekt** (ten z domeną `better-move.pl`). Następnie `npx vercel --prod`. Uwaga: `npx vercel` wymaga Node.js i zalogowania się do Vercel.
5. Po wdrożeniu sprawdź obie wersje domeny (`better-move.pl` i `www.better-move.pl`) oraz widok na telefonie. Jeśli odwiedzający nadal widzą stronę AI, sprawdź, czy nowa wersja trafiła do **właściwego projektu/gałęzi** i jest aktywnym deploymentem Production.

**Nie zmieniaj DNS**, jeżeli domena jest już poprawnie podłączona do tego samego projektu Vercel. Nie publikuj jako nowego projektu, bo wtedy domena może pozostać przy starej stronie.

## Lokalny podgląd

Otwórz `index.html` przez lokalny serwer HTTP (np. w katalogu projektu: `python3 -m http.server 8000`, następnie `http://localhost:8000`). To zapewnia poprawne ładowanie zasobów z `/assets`.

## Informacje do aktualizacji przed publikacją

- Ceny to wartości przykładowe: relaksacyjny 180 zł, sportowy 200 zł, stóp 150 zł za 60 min.
- Telefon rezerwacji: **784 340 292**.
- Dojazd do klienta dostępny po wcześniejszym ustaleniu terminu, lokalizacji i warunków.
- Strona nie ma formularza zbierającego dane. Kliknięcie „Zarezerwuj wizytę” uruchamia połączenie telefoniczne, nie potwierdza rezerwacji automatycznie.
- W razie podania w przyszłości realnej lokalizacji, godzin i adresu można rozbudować lokalne SEO i dane firmy.
