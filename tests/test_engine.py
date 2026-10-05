import json, hashlib, pathlib

def run():
    # Source-level contract tests for the deployable Cloudflare build.
    root=pathlib.Path(__file__).parents[1]
    assert (root/'public/index.html').exists()
    assert (root/'public/access.html').exists()
    assert (root/'functions/api/client.js').exists()
    assert (root/'functions/api/operator.js').exists()
    e=(root/'functions/_engine.js').read_text()
    assert 'TOOL_AUTHORITY_BOUNDARY' in e
    assert 'BLOCKED' in e and 'APPROVED' in e
    c=(root/'functions/api/client.js').read_text()
    assert 'capability_not_entitled' in c
    a=(root/'functions/_auth.js').read_text()
    assert 'revoked_at IS NULL' in a
if __name__=='__main__': run(); print('AURELIS build contract tests: PASS')
