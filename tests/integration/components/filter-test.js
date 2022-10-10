import { module, test } from 'qunit';
import { setupRenderingTest } from 'emberjs-tutorial/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | filter', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Filter />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <Filter>
        template block text
      </Filter>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
