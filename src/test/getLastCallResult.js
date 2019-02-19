export default function getLastCallResult(spy) {
  const calls = spy.mock.calls;
  if (!calls.length) {
    throw Error('Spy has not been called');
  }
  return calls[calls.length - 1][0];
}
