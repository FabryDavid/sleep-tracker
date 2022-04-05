export abstract class LocalStorageWorker {
  public static getCurrentUserId(): string | null {
    return localStorage.getItem('loggedInUserId')
  }

  public static isLoggedIn(): boolean {
    return !!this.getCurrentUserId()
  }
}
