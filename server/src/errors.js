// Błąd z kodem HTTP. Rzucony w dowolnej trasie trafia do errorHandler, który zamienia go
// na odpowiedź `{ error: "komunikat" }`. Komunikaty są po polsku, bo frontend pokazuje je wprost.
export class HttpError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}
