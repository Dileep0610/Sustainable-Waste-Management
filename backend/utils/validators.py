def is_empty_string(value):
    """Check if a string is None or just whitespace."""
    return value is None or str(value).strip() == ""

def trim_whitespace(value):
    """Trim whitespace from a string, returning None if empty."""
    if value is None:
        return None
    trimmed = str(value).strip()
    return trimmed if trimmed else None

def validate_required_fields(data, required_fields):
    """
    Validate that required fields exist and are not empty in a dictionary.
    Returns a list of missing or empty field names.
    """
    if not isinstance(data, dict):
        return required_fields
        
    missing = []
    for field in required_fields:
        if field not in data or is_empty_string(data[field]):
            missing.append(field)
    return missing
