import { vm, vmRaw, watch } from 'jinge';

interface Option {
  value: string;
  label: string;
}

const cityOptions: Option[] = [
  { value: 'shanghai', label: '上海' },
  { value: 'beijing', label: '北京' },
  { value: 'shenzhen', label: '深圳' },
  { value: 'hangzhou', label: '杭州' },
];

const hobbyOptions: Option[] = [
  { value: 'reading', label: '阅读' },
  { value: 'coding', label: '写代码' },
  { value: 'music', label: '音乐' },
  { value: 'sports', label: '运动' },
];

function has<T>(list: readonly T[], value: T) {
  return list.indexOf(value) >= 0;
}

export function App() {
  const form = vm({
    name: 'jinge',
    age: 3,
    password: '',
    bio: '',
    gender: 'female',
    city: 'shanghai',
    cities: ['shanghai', 'beijing'] as string[],
    hobbies: ['reading'] as string[],
    agree: false,
    volume: 40,
    birthday: '2024-01-01',
    locked: false,
  });

  const state = vm({
    output: '',
    submitted: false,
  });

  watch(
    form,
    (value) => {
      state.output = JSON.stringify(vmRaw(value), null, 2);
    },
    { immediate: true },
  );

  function toggleHobby(value: string, checked: boolean) {
    if (checked) {
      form.hobbies.push(value);
    } else {
      const index = form.hobbies.indexOf(value);
      if (index >= 0) form.hobbies.splice(index, 1);
    }
  }

  function reset() {
    form.name = 'jinge';
    form.age = 3;
    form.password = '';
    form.bio = '';
    form.gender = 'female';
    form.city = 'shanghai';
    form.cities = ['shanghai', 'beijing'];
    form.hobbies = ['reading'];
    form.agree = false;
    form.volume = 40;
    form.birthday = '2024-01-01';
    state.submitted = false;
  }

  return (
    <>
      <h1>表单 Form</h1>
      <p className="hint">
        {
          'jinge 没有 v-model：原生控件通过 value / checked / selected 属性绑定，再通过 on:input / on:change 写回数据。'
        }
      </p>

      <div className="toolbar">
        <button className="btn" on:click={() => (form.locked = !form.locked)}>
          {form.locked ? '解锁表单' : '锁定表单'}
        </button>
        <button className="btn" on:click={reset}>
          {'重置'}
        </button>
      </div>

      <form
        className="form"
        on:submit={(evt) => {
          evt.preventDefault();
          state.submitted = true;
        }}
      >
        <fieldset className="fieldset" disabled={form.locked}>
          <label className="field">
            <span className="label">{'姓名'}</span>
            <input
              className="input"
              value={form.name}
              on:input={(evt) => (form.name = evt.target.value)}
            />
            <span className="counter">{form.name.length}</span>
          </label>

          <label className="field">
            <span className="label">{'年龄'}</span>
            <input
              className="input narrow"
              type="number"
              min="1"
              max="120"
              value={form.age}
              on:input={(evt) => (form.age = Number(evt.target.value))}
            />
          </label>

          <label className="field">
            <span className="label">{'密码'}</span>
            <input
              className="input"
              type="password"
              value={form.password}
              placeholder={'至少 6 位'}
              on:input={(evt) => (form.password = evt.target.value)}
            />
          </label>

          <label className="field">
            <span className="label">{'生日'}</span>
            <input
              className="input"
              type="date"
              value={form.birthday}
              on:change={(evt) => (form.birthday = evt.target.value)}
            />
          </label>

          <label className="field align-top">
            <span className="label">{'简介'}</span>
            <textarea
              className="input textarea"
              value={form.bio}
              placeholder={'换行、长度都会实时汇总到右侧'}
              on:input={(evt) => (form.bio = evt.target.value)}
            ></textarea>
            <span className="counter">{form.bio.length}</span>
          </label>

          <div className="field">
            <span className="label">{'性别'}</span>
            <div className="options">
              <label className="option">
                <input
                  type="radio"
                  name="gender"
                  checked={form.gender === 'female'}
                  on:change={() => (form.gender = 'female')}
                />
                {'女'}
              </label>
              <label className="option">
                <input
                  type="radio"
                  name="gender"
                  checked={form.gender === 'male'}
                  on:change={() => (form.gender = 'male')}
                />
                {'男'}
              </label>
              <label className="option">
                <input
                  type="radio"
                  name="gender"
                  checked={form.gender === 'other'}
                  on:change={() => (form.gender = 'other')}
                />
                {'其他'}
              </label>
            </div>
          </div>

          <label className="field">
            <span className="label">{'城市（单选）'}</span>
            <select
              className="input"
              value={form.city}
              on:change={(evt) => (form.city = evt.target.value)}
            >
              {cityOptions.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field align-top">
            <span className="label">{'城市（多选）'}</span>
            <select
              className="input"
              multiple
              size={4}
              on:change={(evt) => {
                form.cities = Array.from(evt.target.selectedOptions).map((option) => option.value);
              }}
            >
              {cityOptions.map((city) => (
                <option key={city.value} value={city.value} selected={has(form.cities, city.value)}>
                  {city.label}
                </option>
              ))}
            </select>
          </label>

          <div className="field align-top">
            <span className="label">{'爱好'}</span>
            <div className="options">
              {hobbyOptions.map((hobby) => (
                <label key={hobby.value} className="option">
                  <input
                    type="checkbox"
                    checked={has(form.hobbies, hobby.value)}
                    on:change={(evt) => toggleHobby(hobby.value, evt.target.checked)}
                  />
                  {hobby.label}
                </label>
              ))}
            </div>
          </div>

          <label className="field">
            <span className="label">{'音量'}</span>
            <input
              className="range"
              type="range"
              min="0"
              max="100"
              value={form.volume}
              on:input={(evt) => (form.volume = Number(evt.target.value))}
            />
            <span className="counter">{form.volume}</span>
          </label>

          <label className="field">
            <span className="label">{'协议'}</span>
            <label className="option">
              <input
                type="checkbox"
                checked={form.agree}
                on:change={(evt) => (form.agree = evt.target.checked)}
              />
              {'我已阅读并同意用户协议'}
            </label>
          </label>
        </fieldset>

        <div className="actions">
          <button className="btn primary" type="submit">
            {'提交'}
          </button>
          <button className="btn" type="button" on:click={reset}>
            {'重置'}
          </button>
          {state.submitted && <span className="ok">{'已提交，数据见右侧汇总。'}</span>}
        </div>
      </form>

      <h2>表单数据汇总</h2>
      <pre className="output">{state.output}</pre>
      <p className="hint">
        {
          '汇总通过 watch(form, ...) 深度监听后 JSON.stringify(vmRaw(form)) 得到；vmRaw 用于拿到不含 Proxy 的原始数据。'
        }
      </p>
    </>
  );
}
