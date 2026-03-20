export const intentionalErrorTriggers = {
  signInEmail: 'zipy-signin-error@example.com',
  signUpName: 'zipy-signup-error',
  addToCartQuantity: 6,
  checkoutQuantity: 7,
  checkoutZip: '99999',
  signOutEmail: 'zipy-signout-error@example.com',
} as const;

// Use distinct Error subclasses so monitoring can verify grouping across multiple
// handled UI paths without relying only on the screen name or message text.
export function buildIntentionalUiError(kind: keyof typeof intentionalErrorTriggers) {
  switch (kind) {
    case 'signInEmail':
      return new TypeError('Intentional sign-in monitoring test error.');
    case 'signUpName':
      return new SyntaxError('Intentional sign-up monitoring test error.');
    case 'addToCartQuantity':
      return new RangeError('Intentional add-to-cart monitoring test error.');
    case 'checkoutQuantity':
      return new ReferenceError('Intentional cart checkout monitoring test error.');
    case 'checkoutZip':
      return new URIError('Intentional place-order monitoring test error.');
    case 'signOutEmail':
      return new EvalError('Intentional sign-out monitoring test error.');
  }
}
