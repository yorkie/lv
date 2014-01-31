
#include <assert.h>
#include <stdio.h>
#include "object.h"
#include "internal.h"

/*
 * Print `self` to stdout.
 */

void
quip_object_inspect(quip_object_t *self) {
  switch (self->type) {
    case QUIP_TYPE_FLOAT:
      printf("%2f\n", self->value.as_float);
      break;
    case QUIP_TYPE_INT:
      printf("%d\n", self->value.as_int);
      break;
    default:
      assert(0 && "unhandled");
  }
}

/*
 * Allocate an initialize a new object of the given `type`.
 */

static quip_object_t *
alloc_object(quip_object type) {
  quip_object_t *self = malloc(sizeof(quip_object_t));
  if (unlikely(!self)) return NULL;
  self->type = type;
  return self;
}

/*
 * Allocate a new int object with the given `val`.
 */

quip_object_t *
quip_int_new(int val) {
  quip_object_t *self = alloc_object(QUIP_TYPE_INT);
  if (unlikely(!self)) return NULL;
  self->value.as_int = val;
  return self;
}

/*
 * Allocate a new float object with the given `val`.
 */

quip_object_t *
quip_float_new(float val) {
  quip_object_t *self = alloc_object(QUIP_TYPE_FLOAT);
  if (unlikely(!self)) return NULL;
  self->value.as_float = val;
  return self;
}
