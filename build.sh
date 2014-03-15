#!/usr/bin/env bash

nasm -f macho $1.asm
ld -e main \
   -o $1 $1.o\
   -macosx_version_min '10.6'