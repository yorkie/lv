#!/usr/bin/env bash

nasm -f macho tests/parser-test.asm
ld -e main \
   -o tests/parser-test tests/parser-test.o\
   -macosx_version_min '10.6'