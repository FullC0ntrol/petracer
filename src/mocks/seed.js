/*
  Dane przykładowe — stan „bazy” zaraz po pierwszym uruchomieniu albo po resecie.

  Relacje między tabelami idą przez identyfikatory, jak w prawdziwej bazie SQL:
    pet.ownerId → user.id,  tag.petId → pet.id,  walk.petId → pet.id,  itd.

  Daty liczymy względem chwili utworzenia danych (a nie wpisujemy na sztywno), żeby demo
  zawsze wyglądało świeżo: przypomnienie „zaległe” jest zaległe, a spacery są z ostatnich tygodni.
  Wszystkie daty zapisujemy jako tekst ISO 8601 (np. "2026-10-15T08:30:00.000Z") — tak samo
  przyjdą kiedyś w JSON-ie z backendu.
*/

const DAY_MS = 24 * 60 * 60 * 1000

// Dzień względem „teraz” o podanej godzinie, np. at(-3, 7, 30) = trzy dni temu o 7:30.
function at(daysFromNow, hours = 12, minutes = 0) {
  const date = new Date(Date.now() + daysFromNow * DAY_MS)
  date.setHours(hours, minutes, 0, 0)
  return date.toISOString()
}

// Trasy jako listy punktów [szerokość, długość] — format, którego używa Leaflet.
const BLONIA_LOOP = [
  [50.0584, 19.9203], [50.0578, 19.9154], [50.0573, 19.9098], [50.0569, 19.9041],
  [50.0571, 19.8992], [50.0597, 19.8979], [50.0624, 19.8976], [50.0636, 19.9028],
  [50.0641, 19.9087], [50.0639, 19.9142], [50.0621, 19.9178], [50.0598, 19.9199],
  [50.0584, 19.9203],
]

const VISTULA_BOULEVARDS = [
  [50.0561, 19.9287], [50.0549, 19.9311], [50.0538, 19.9336], [50.0527, 19.9362],
  [50.0517, 19.9389], [50.0507, 19.9417], [50.0497, 19.9446], [50.0487, 19.9474],
  [50.0478, 19.9502], [50.0471, 19.9531],
]

// Spacer „tam i z powrotem” wzdłuż Wisły.
const VISTULA_THERE_AND_BACK = [...VISTULA_BOULEVARDS, ...VISTULA_BOULEVARDS.slice(0, -1).reverse()]

// Krótka runda: pierwsza połowa pętli po Błoniach.
const BLONIA_SHORT = BLONIA_LOOP.slice(0, 7)

// Pojedynczy spacer Luny. Dystans jest zapisany (policzył go „serwer” przy zapisie),
// a nie liczony przy każdym wyświetleniu.
function lunaWalk(id, daysAgo, hour, route, distanceM, durationMin, note = '') {
  return {
    id,
    petId: 'luna',
    startedAt: at(-daysAgo, hour, 15),
    durationS: durationMin * 60,
    distanceM,
    route,
    note,
  }
}

export function createSeed() {
  return {
    users: [
      {
        id: 'u-maciej',
        email: 'maciej@pettrace.pl',
        name: 'Maciej',
        city: 'Kraków',
        phone: '+48 600 123 456',
      },
    ],

    pets: [
      {
        id: 'luna',
        ownerId: 'u-maciej',
        name: 'Luna',
        species: 'dog',
        breed: 'Border collie',
        sex: 'female',
        birthDate: '2023-05-14',
        color: 'czarno-biała',
        avatarColor: 'pine',
        tagId: 'LUNA-7K2Q',
        isLost: false,
        lostSince: null,
        lostMessage: '',
        health: {
          allergies: ['kurczak'],
          conditions: [],
          medications: [{ name: 'Bravecto', dose: '1 tabletka', frequency: 'co 12 tygodni' }],
          vaccinations: [
            { name: 'Wścieklizna', date: at(-200), validUntil: at(165) },
            { name: 'DHPPi + L4', date: at(-150), validUntil: at(215) },
          ],
          weightHistory: [
            { date: at(-180), kg: 16.8 },
            { date: at(-90), kg: 17.2 },
            { date: at(-10), kg: 17.5 },
          ],
        },
      },
      {
        id: 'mruczek',
        ownerId: 'u-maciej',
        name: 'Mruczek',
        species: 'cat',
        breed: 'Europejski krótkowłosy',
        sex: 'male',
        birthDate: '2020-08-02',
        color: 'rudy pręgowany',
        avatarColor: 'ember',
        tagId: 'MRCZ-4P9D',
        isLost: true,
        lostSince: at(-2, 19, 40),
        lostMessage: 'Mruczek jest płochliwy — nie łap go, tylko daj znać, gdzie jest. Lubi suchą karmę.',
        health: {
          allergies: [],
          conditions: ['Przewlekła choroba nerek (wczesne stadium)'],
          medications: [{ name: 'Semintra', dose: '0,5 ml', frequency: 'raz dziennie' }],
          vaccinations: [{ name: 'Panleukopenia, katar koci', date: at(-320), validUntil: at(45) }],
          weightHistory: [
            { date: at(-120), kg: 5.1 },
            { date: at(-30), kg: 4.9 },
          ],
        },
      },
    ],

    // Tag to fizyczny brelok. `petId: null` = tag niesparowany (do demonstracji ekranu „Tag nieaktywny”).
    tags: [
      { id: 'LUNA-7K2Q', petId: 'luna', isActive: true, pairedAt: at(-400) },
      { id: 'MRCZ-4P9D', petId: 'mruczek', isActive: true, pairedAt: at(-380) },
      { id: 'XXXX-0000', petId: null, isActive: false, pairedAt: null },
    ],

    walks: [
      lunaWalk('w-01', 1, 7, BLONIA_LOOP, 3240, 41, 'Dużo psów na Błoniach, Luna grzeczna.'),
      lunaWalk('w-02', 2, 18, VISTULA_THERE_AND_BACK, 3780, 52),
      lunaWalk('w-03', 3, 7, BLONIA_SHORT, 1650, 22),
      lunaWalk('w-04', 4, 17, BLONIA_LOOP, 3240, 44),
      lunaWalk('w-05', 6, 8, VISTULA_BOULEVARDS, 1890, 27, 'Tylko w jedną stronę, wracaliśmy tramwajem.'),
      lunaWalk('w-06', 7, 18, BLONIA_LOOP, 3240, 39),
      lunaWalk('w-07', 9, 7, VISTULA_THERE_AND_BACK, 3780, 55),
      lunaWalk('w-08', 11, 17, BLONIA_SHORT, 1650, 20),
      lunaWalk('w-09', 13, 9, BLONIA_LOOP, 3240, 47, 'Aport przy Juliusie Leo.'),
      lunaWalk('w-10', 15, 18, VISTULA_THERE_AND_BACK, 3780, 50),
      lunaWalk('w-11', 18, 7, BLONIA_LOOP, 3240, 42),
      lunaWalk('w-12', 21, 17, BLONIA_SHORT, 1650, 23),
      lunaWalk('w-13', 24, 10, VISTULA_THERE_AND_BACK, 3780, 58, 'Długi niedzielny spacer.'),
      lunaWalk('w-14', 27, 18, BLONIA_LOOP, 3240, 40),
    ],

    reminders: [
      { id: 'r-01', petId: 'mruczek', type: 'medication', title: 'Semintra — dawka wieczorna', dueDate: at(0, 20), doneAt: null },
      { id: 'r-02', petId: 'luna', type: 'deworming', title: 'Odrobaczanie', dueDate: at(-3, 9), doneAt: null },
      { id: 'r-03', petId: 'luna', type: 'medication', title: 'Bravecto (kleszcze)', dueDate: at(4, 9), doneAt: null },
      { id: 'r-04', petId: 'mruczek', type: 'visit', title: 'Kontrola nerek — badanie krwi', dueDate: at(9, 16, 30), doneAt: null },
      { id: 'r-05', petId: 'mruczek', type: 'vaccination', title: 'Szczepienie: panleukopenia, katar koci', dueDate: at(45, 10), doneAt: null },
      { id: 'r-06', petId: 'luna', type: 'vaccination', title: 'Szczepienie: wścieklizna', dueDate: at(165, 10), doneAt: null },
      { id: 'r-07', petId: 'luna', type: 'visit', title: 'Przegląd stomatologiczny', dueDate: at(-20, 11), doneAt: at(-20, 11, 40) },
    ],

    // Audyt: kto i w jakiej roli zeskanował tag. `place` to przybliżenie (dzielnica), nie dokładny adres.
    tagScans: [
      { id: 's-01', tagId: 'MRCZ-4P9D', scannedAt: at(-1, 8, 12), context: 'finder', place: 'Kraków, Krowodrza' },
      { id: 's-02', tagId: 'MRCZ-4P9D', scannedAt: at(-1, 21, 47), context: 'finder', place: 'Kraków, Bronowice' },
      { id: 's-03', tagId: 'LUNA-7K2Q', scannedAt: at(-1, 7, 2), context: 'owner', place: 'Kraków, Zwierzyniec' },
      { id: 's-04', tagId: 'LUNA-7K2Q', scannedAt: at(-5, 14, 20), context: 'vet', place: 'Kraków, Grzegórzki' },
      { id: 's-05', tagId: 'LUNA-7K2Q', scannedAt: at(-12, 16, 5), context: 'finder', place: 'Kraków, Stare Miasto' },
    ],

    // Zgłoszenia lokalizacji od znalazców (pinezki na mapie w trybie zaginięcia).
    locationReports: [
      {
        id: 'lr-01',
        petId: 'mruczek',
        tagId: 'MRCZ-4P9D',
        createdAt: at(-1, 8, 14),
        lat: 50.0742,
        lng: 19.9128,
        accuracyM: 25,
        message: 'Siedzi pod samochodem przy ul. Królewskiej, nie daje się podejść.',
        finderPhone: '',
      },
      {
        id: 'lr-02',
        petId: 'mruczek',
        tagId: 'MRCZ-4P9D',
        createdAt: at(-1, 21, 49),
        lat: 50.0811,
        lng: 19.8954,
        accuracyM: 40,
        message: 'Widziałam go w ogródkach działkowych, przy furtce od strony Bronowic.',
        finderPhone: '+48 511 222 333',
      },
    ],

    // Tymczasowe udostępnienie paszportu medycznego. `scope` = które sekcje widzi weterynarz.
    vetShares: [
      {
        id: 'vs-01',
        token: 'DEMO-SHARE',
        petId: 'luna',
        createdAt: at(-1, 10),
        expiresAt: at(1, 10),
        scope: ['vaccinations', 'medications', 'allergies', 'weight'],
        revokedAt: null,
      },
    ],

    // Tabele „techniczne” logowania — puste na starcie, wypełniają je funkcje z `api/auth.js`.
    magicLinks: [],
    sessions: [],
  }
}
