import ngModuleName from './index.js';
describe('invoke-filter', () => {
  beforeEach(window.module(ngModuleName));
  let invoke, spy;
  beforeEach(inject(($filter) => {
    invoke = $filter('invoke');
    spy = sinon.spy();
  }));

  it('should accept and invoke a function', () => {
    invoke(spy);
    expect(spy).to.have.been.calledOnce;
  });

  it('should accept arguments to that function', () => {
    invoke(spy, 'foo', 'bar');
    expect(spy).to.have.been.calledWith('foo', 'bar');
  });

  describe('behavior in templates', () => {
    const template = `<div>{{spy | invoke:foo:bar}}</div>`;
    let scope, $compile;

    beforeEach(inject((_$compile_, $rootScope) => {
      $compile = _$compile_;
      scope = $rootScope.$new();
      scope.foo = 'hello world';
      scope.bar = {a: 'b', c: 'd'};
      scope.spy = spy;
    }));

    it.skip('should not be called on digests when arguments have not changed', () => {
      expect(spy, 'fn should not have been called before digest').to.have.not.been.called;
      compileAndDigest();

      expect(spy, 'fn should be called only once at the start').to.have.been.calledOnce;
      expect(spy, 'fn should be called with provided args').to.have.been.calledWith('hello world', scope.bar);

      spy.reset();
      scope.$digest();

      expect(spy, 'fn should not be called when args have not changed').to.not.have.been.called;

      // change the arguments
      scope.foo = 'goodbye world';
      scope.$digest();

      expect(spy, 'fn should be called when args change').to.have.been.calledOnce;
      expect(spy, 'fn should be called with the new args').to.have.been.calledWith('goodbye world', scope.bar);
    });

    function compileAndDigest() {
      $compile(template)(scope);
      scope.$digest();
    }
  });
});

