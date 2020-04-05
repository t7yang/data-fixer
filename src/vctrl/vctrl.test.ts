import * as yup from 'yup';
import { ajvAdt, yupAdt } from '../adapter';
import { vctrl } from './vctrl';

describe('test for vctrl when alt if not a function', () => {
  const alt = 1;
  const isGt0Ajv = vctrl(ajvAdt({ type: 'number', exclusiveMinimum: 0 }), alt);
  const isGt0Yup = vctrl(yupAdt(yup.number().moreThan(0)), alt);

  it('vctrl should return given value if valid', () => {
    const target = 5;
    const holderAjv = isGt0Ajv(target);
    const holderYup = isGt0Yup(target);

    expect(holderAjv.valid).toBe(true);
    expect(holderAjv.invalid).toBe(false);
    expect(holderAjv.value()).toBe(5);

    expect(holderYup.valid).toBe(true);
    expect(holderYup.invalid).toBe(false);
    expect(holderYup.value()).toBe(5);
  });

  it('vctrl should return alt if given value not valid', () => {
    const target = 0;
    const holderAjv = isGt0Ajv(target);
    const holderYup = isGt0Yup(target);

    expect(holderAjv.valid).toBe(false);
    expect(holderAjv.invalid).toBe(true);
    expect(holderAjv.value()).toBe(alt);

    expect(holderYup.valid).toBe(false);
    expect(holderYup.invalid).toBe(true);
    expect(holderYup.value()).toBe(alt);
  });
});

describe('test for vctrl when alt is function', () => {
  const altFn = (p: any) => (typeof p === 'number' ? Math.abs(p) + 1 : 1);
  const isGt0Ajv = vctrl(ajvAdt({ type: 'number', minimum: 0 }), altFn);
  const isGt0Yup = vctrl(yupAdt(yup.number().min(0)), altFn);

  it('vctrl should return given value if valid', () => {
    const holderAjv = isGt0Ajv(2);
    const holderYup = isGt0Yup(2);

    expect(holderAjv.valid).toBe(true);
    expect(holderAjv.invalid).toBe(false);
    expect(holderAjv.value()).toBe(2);

    expect(holderYup.valid).toBe(true);
    expect(holderYup.invalid).toBe(false);
    expect(holderYup.value()).toBe(2);
  });

  it('vctrl should return 1 if given value not type number', () => {
    const holderAjv = isGt0Ajv('asdf');
    const holderYup = isGt0Yup('asdf');

    expect(holderAjv.valid).toBe(false);
    expect(holderAjv.invalid).toBe(true);
    expect(holderAjv.value()).toBe(1);

    expect(holderYup.valid).toBe(false);
    expect(holderYup.invalid).toBe(true);
    expect(holderYup.value()).toBe(1);
  });

  it('vctrl should return abs + 1 if given value is type number', () => {
    const holderAjv = isGt0Ajv(-7);
    const holderYup = isGt0Yup(-7);

    expect(holderAjv.valid).toBe(false);
    expect(holderAjv.invalid).toBe(true);
    expect(holderAjv.value()).toBe(8);

    expect(holderYup.valid).toBe(false);
    expect(holderYup.invalid).toBe(true);
    expect(holderYup.value()).toBe(8);
  });
});
