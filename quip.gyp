{
  'targets': [

    {
      'target_name': 'quip',
      'type': 'executable',
      'sources': [
        'src/quip.c',
        'src/ast.c',
        'src/lexer.c',
        'src/parser.c',
        'src/token.c',
        'src/vm.c',
        'src/vec.c',
        'deps/linenoise/linenoise.c',
        'deps/khash.c',
        'deps/kvec.c',
      ],
      'include_dirs': [
        '.',
        'src',
        'deps',
        'deps/libuv/include',
        'deps/linenoise',
      ],
      'dependencies': [
        'deps/clibs/clibs.gyp:clibs',
        'deps/libuv/uv.gyp:libuv',
      ],
      'link_settings': {
        'libraries': [
        ]
      },
      'cflags!': [ '-fno-exceptions' ],
      'cflags_cc!': [ '-fno-exceptions' ],
      'cflags': [
          '-std=c99',
          '-Wall',
          '-O3',
      ],
    },

  ]
}