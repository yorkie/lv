
#ifndef __QUIP_OBJ_H__
#define __QUIP_OBJ_H__

/*
 * Check if `val` is the given type.
 */

#define quip_object_is(val, t) ((val)->type == QUIP_TYPE_##t)

/*
 * Specific type macros.
 */

#define quip_is_node(val) quip_object_is(val, NODE)
#define quip_is_array(val) quip_object_is(val, ARRAY)
#define quip_is_object(val) quip_object_is(val, OBJECT)
#define quip_is_string(val) quip_object_is(val, STRING)
#define quip_is_float(val) quip_object_is(val, FLOAT)
#define quip_is_int(val) quip_object_is(val, INT)
#define quip_is_bool(val) quip_object_is(val, BOOL)
#define quip_is_null(val) quip_object_is(val, NULL)

/*
 * Quip value types.
 */

typedef enum {
  QUIP_TYPE_NULL,
  QUIP_TYPE_NODE,
  QUIP_TYPE_BOOL,
  QUIP_TYPE_INT,
  QUIP_TYPE_FLOAT,
  QUIP_TYPE_STRING,
  QUIP_TYPE_OBJECT,
  QUIP_TYPE_ARRAY,
  QUIP_TYPE_LIST
} quip_object;

/*
 * Quip object.
 */

typedef struct quip_object_struct {
  quip_object type;
  union {
    void *as_pointer;
    int as_int;
    float as_float;
  } value;
} quip_object_t;

quip_object_t *
quip_int_new(int val);

quip_object_t *
quip_float_new(float val);

#endif 
