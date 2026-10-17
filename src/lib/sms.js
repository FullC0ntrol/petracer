/*
  Link `sms:` otwiera systemową aplikację wiadomości z wpisanym numerem i treścią (decyzja D4).
  Lokalizacja znalazcy trafia tylko do treści SMS-a — aplikacja nigdzie jej nie wysyła ani nie zapisuje.

  Składnia różni się między systemami:
    Android: sms:+48600123456?body=treść
    iOS:     sms:+48600123456&body=treść   (iOS przez lata ignorował wariant ze znakiem zapytania)
  Dlatego rozpoznajemy system po User-Agent. iPad z iPadOS 13+ podaje się za Maca, ale ma ekran
  dotykowy — stąd dodatkowy warunek z `maxTouchPoints`.
*/
export function isIOS() {
  const userAgent = navigator.userAgent
  return /iPhone|iPad|iPod/i.test(userAgent) || (/Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1)
}

// "+48 600 123 456" → "+48600123456". Spacje i myślniki psują link na części telefonów.
export function normalizePhone(phone) {
  return phone.replace(/[^\d+]/g, '')
}

export function buildSmsLink(phone, body) {
  const separator = isIOS() ? '&' : '?'
  return `sms:${normalizePhone(phone)}${separator}body=${encodeURIComponent(body)}`
}

export function buildTelLink(phone) {
  return `tel:${normalizePhone(phone)}`
}

// 5 miejsc po przecinku to ok. 1 m dokładności — więcej nie ma sensu przy GPS telefonu.
export function mapsLink(latitude, longitude) {
  return `https://maps.google.com/?q=${latitude.toFixed(5)},${longitude.toFixed(5)}`
}

export function buildFinderMessage(petName, position) {
  const intro = `Dzień dobry, znalazłem/znalazłam Pani/Pana zwierzę: ${petName} (wiadomość ze strony zawieszki PetTrace).`
  if (!position) {
    return `${intro} Nie udało się pobrać lokalizacji z telefonu — opisuję miejsce, w którym jestem: `
  }
  const accuracy = Math.round(position.accuracy)
  return `${intro} Jestem tutaj: ${mapsLink(position.latitude, position.longitude)} (dokładność ok. ${accuracy} m).`
}
