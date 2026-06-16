class DevanaError(Exception):
    """Base class for exceptions in Devana client."""
    pass

class DevanaApiError(DevanaError):
    """Exception raised for errors during API calls."""
    def __init__(self, status: int, message: str):
        self.status = status
        self.message = message
        super().__init__(f"API Error {status}: {message}")
