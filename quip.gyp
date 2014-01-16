{
  'targets': [

    {
      'target_name': 'quip',
      'type': 'executable',
      'sources': [
        'src/quip.c',
      ],
      'include_dirs': [
        '.',
        'src',
        'include',
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