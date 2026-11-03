import { For, vm, vmRaw, watch } from 'jinge';

export function App() {
  const data = vm({
    t: 'hello',
    t2: 'hello\njinge',
    t3: true,
    t4: [] as string[],
    t5: 'Banana',
    t6: '',
    t7: [] as string[],
  });
  const fruits5 = ['Apple', 'Orange', 'Banana'];
  const fruits4 = fruits5.map((f) => ({ name: f, selected: false }));
  const state = vm({
    output: JSON.stringify(vmRaw(data), null, 2),
  });

  watch(data, (v) => {
    state.output = JSON.stringify(vmRaw(v), null, 2);
  });

  function add(f: string) {
    console.info('add', f);
    data.t4.push(f);
  }
  function del(f: string) {
    const i = data.t4.indexOf(f);
    if (i >= 0) data.t4.splice(i, 1);
  }

  function test() {
    data.t2 = data.t = 'hello';
    data.t6 = fruits5[2];
  }

  return (
    <>
      <h2>Form Input</h2>
      <div>
        <form>
          <p>
            <label htmlFor="t">TEXT:</label>
            <input
              id="t"
              value={data.t}
              placeholder="input 1"
              on:input={(evt) => {
                data.t = evt.target.value;
              }}
            />
          </p>
          <p>
            <label htmlFor="t2">TEXTAREA:</label>
            <textarea
              id="t2"
              value={data.t2}
              placeholder={`input ${data.t}`}
              on:input={(evt) => (data.t2 = evt.target.value)}
            ></textarea>
          </p>
          <p>
            <label>CHECKBOX:</label>
            <input
              id="t3"
              type="checkbox"
              checked={data.t3}
              on:change={(evt) => (data.t3 = evt.target.checked)}
            />
            <label htmlFor="t3">Click here to check: {data.t3}</label>
          </p>
          <p>
            <label>MULTI CHECK:</label>
            <For loop={fruits4}>
              {(each) => (
                <label>
                  <input
                    name="t4"
                    checked={each.data.selected}
                    on:change={(evt) => {
                      each.data.selected = evt.target.checked;
                      if (evt.target.checked) {
                        add(each.data.name);
                      } else {
                        del(each.data.name);
                      }
                    }}
                    type="checkbox"
                  />
                  {each.data.name}
                </label>
              )}
            </For>
          </p>
          <p>
            <label>RADIO:</label>
            {fruits5.map((fruit) => (
              <label key={fruit}>
                <input
                  name="t5"
                  checked={fruit === data.t5}
                  on:click={() => (data.t5 = fruit)}
                  type="radio"
                />
                {fruit}
              </label>
            ))}
          </p>
          <p>
            <label>SELECT:</label>
            <select value={data.t6} on:change={(evt) => (data.t6 = evt.target.value)}>
              <option disabled value="">
                Please select one
              </option>
              {fruits5.map((fruit) => (
                <option key={fruit} value={fruit}>
                  {fruit}
                </option>
              ))}
            </select>
          </p>
          <p>
            <label>MULTI SELECT:</label>
            <select
              multiple
              on:change={(evt) => {
                data.t7 = data.t4 = [
                  ...(evt.target.selectedOptions as unknown as HTMLOptionElement[]),
                ].map((opt) => opt.value);
              }}
            >
              {fruits4.map((fruit) => (
                <option key={fruit.name} value={fruit.name} selected={data.t7.includes(fruit.name)}>
                  {fruit.name}
                </option>
              ))}
            </select>
          </p>
        </form>
      </div>
      <h4>Input Form Data:</h4>
      <pre>{state.output}</pre>
      <p>
        <button on:click={() => test()}>Test</button>
      </p>
    </>
  );
}
