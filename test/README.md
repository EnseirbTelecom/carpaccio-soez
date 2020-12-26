# Tests

Every javascript file in 'src' have two files
corresponding to it in 'test'. The file ending
with 'assert' the real test contains. The other
file ending with 'test' simply import the
previous file, it is a trick in order to make
Jest work correctly with the esm module.
