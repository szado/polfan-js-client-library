class DevanaError(Exception):
    """Base class for all Devana exceptions."""
    pass

class ApiError(DevanaError):
    """Raised when the API returns an error response."""
    def __init__(self, message: str, status_code: int = None, payload: dict = None):
        super().__init__(message)
        self.status_code = status_code
        self.payload = payload

class ConnectionTimeoutError(DevanaError):
    """Raised when a connection to the server times out."""
    pass

class NotReadyError(DevanaError):
    """Raised when an operation is attempted but the client is not ready."""
    pass
