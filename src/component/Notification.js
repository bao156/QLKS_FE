import { Modal } from "antd";

export function Success(title, content) {
  return Modal.success({
    title: title,
    content: content,
  });
}

export function Error(title, content) {
  return Modal.error({
    title: title,
    content: content,
  });
}

export function Confirm(title, content) {
  return Modal.confirm({
    title: title,
    content: content,
  });
}

export function Warning(title, content) {
  return Modal.warning({
    title: title,
    content: content,
  });
}

