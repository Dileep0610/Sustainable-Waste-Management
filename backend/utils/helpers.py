# General helper functions

def parse_pagination(request):
    """Extract page and limit from request args."""
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 10, type=int)
    return page, limit
