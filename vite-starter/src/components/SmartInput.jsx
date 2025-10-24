import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";

// SmartInput exposes imperative methods to parent: focus() and clear()
// Demonstrates forwardRef + useImperativeHandle and a layout effect for autofocus
const SmartInput = forwardRef(function SmartInput(
  { value, onChange, placeholder, autoFocus = false },
  ref
) {
  const inputRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      focus: () => inputRef.current && inputRef.current.focus(),
      clear: () => {
        if (onChange) onChange({ target: { value: "" } });
        if (inputRef.current) inputRef.current.value = "";
      },
    }),
    [onChange]
  );

  useLayoutEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <input
      ref={inputRef}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{ padding: 8, minWidth: 240 }}
    />
  );
});

export default SmartInput;
