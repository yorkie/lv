
//
// utils.h
//
// Copyright (c) 2013 TJ Holowaychuk <tj@vision-media.ca>
//

#ifndef FILE_H
#define FILE_H

#include <sys/stat.h>

off_t
file_size(const char *filename);

int
file_exists(const char *filename);

char *
file_read(const char *filename);

#endif