#!/usr/bin/env bash

nasm -f macho build/hello.asm
ld -e main \
   -o build/hello build/hello.o\
   -macosx_version_min '10.6'