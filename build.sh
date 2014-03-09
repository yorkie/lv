#!/usr/bin/env bash

nasm -f macho tests/asm-test.asm
ld -e main \
   -o tests/asm-test tests/asm-test.o\
   -macosx_version_min '10.6'