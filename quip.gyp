{
  'targets': [

    {
      'target_name': 'quip',
      'type': 'executable',
      'sources': [
        'src/quip.c',
        'src/ast.c',
        'src/parser.c',
      ],
      'include_dirs': [
        '.',
        'src',
        'deps/libuv/include',
      ],
      'dependencies': [
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