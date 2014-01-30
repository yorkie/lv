
//
// token.h
//
// Copyright (c) 2014 Yorkie Neil <yorkiefixer@gmail.com>
//

#ifndef __QUIP_TOKEN__
#define __QUIP_TOKEN__

#include <assert.h>

/*
 * Tokens.
 */

#define QUIP_TOKEN_LIST \
  t(ILLEGAL, "illegal") \
  t(EOS, "end-of-source") \
  t(NEWLINE, "newline") \
  t(ID, "id") \
  t(FUNCTION, "function") \
  t(WHILE, "while") \
  t(IF, "if") \
  t(ELSE, "else") \
  t(FOR, "for") \
  t(RETURN, "return") \
  t(SETTER, "set") \
  t(GETTER, "get") \
  t(THIS, "this") \
  t(SUPER, "super") \
  t(NEW, "new") \
  t(INHERITS, "inherits") \
  t(YIELD, "yield") \
  t(TRY, "try") \
  t(CATCH, "catch") \
  t(THROW, "throw") \
  t(FINALLY, "finally") \
  t(LBRACE, "{") \
  t(RBRACE, "}") \
  t(LPAREN, "(") \
  t(RPAREN, ")") \
  t(LBRACK, "[") \
  t(RBRACK, "]") \
  t(COLON, ":") \
  t(QMARK, "?") \
  t(SEMICOLON, ";") \
  t(COMMA, ",") \
  t(OP_DOT, ".") \
  t(OP_NOT, "!") \
  t(OP_PLUS, "+") \
  t(OP_MINUS, "-") \
  t(OP_MUL, "*") \
  t(OP_DIV, "/") \
  t(OP_MOD, "%") \
  t(OP_GT, ">") \
  t(OP_LT, "<") \
  t(OP_GTE, ">=") \
  t(OP_LTE, "<=") \
  t(OP_EQ, "==") \
  t(OP_NEQ, "!=") \
  t(OP_AND, "&&") \
  t(OP_OR, "||") \
  t(OP_ASSIGN, "=") \
  t(OP_PLUS_ASSIGN, "+=") \
  t(OP_MINUS_ASSIGN, "-=") \
  t(OP_MUL_ASSIGN, "*=") \
  t(OP_DIV_ASSIGN, "/=") \
  t(OP_BIT_AND, "&") \
  t(OP_BIT_OR, "|") \
  t(OP_BIT_XOR, "^") \
  t(OP_BIT_NOT, "~") \
  t(OP_BIT_SHL, "<<") \
  t(OP_BIT_SHR, ">>")

/*
 * Tokens enum.
 */

typedef enum {
#define t(tok, str) QUIP_TOKEN_##tok,
QUIP_TOKEN_LIST
#undef t
} quip_token;

/*
 * Token strings.
 */

static char *quip_token_strings[] = {
#define t(tok, str) str,
QUIP_TOKEN_LIST
#undef t
};

/*
 * Token struct.
 */

typedef struct {
  int len;
  quip_token type;
  struct {
    char *as_string;
    float as_float;
    int as_int;
  } value;
} quip_token_t;

/*
 * Return the string associated with the
 * given token `type`.
 */

static inline const char *
quip_token_type_string(quip_token type) {
  assert(type <= QUIP_TOKEN_OP_BIT_SHR);
  return quip_token_strings[type];
}

// protos

void
quip_token_inspect(quip_token_t *tok);

#endif /* __QUIP_TOKEN__ */