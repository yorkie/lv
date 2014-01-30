{
  'targets': [
    {
      'target_name': 'clibs',
      'type': '<(library)',
      'sources': [
        'buffer.c',
        'file.c',
        'readline.c',
      ],
      'include_dirs': [
        '.',
      ],
      'defines': [
        '__USE_GUN',
        '__USE_POSIX',
      ],
      'cflags': [
        '-std=c99',
        '-Wall',
        '-O3'
      ],
      'conditions': [
        ['OS=="mac"', {
          'xcode_settings': {
            'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
            'GCC_C_LANGUAGE_STANDARD': 'c99'
          }
        }]
      ]
    },

  ]
}