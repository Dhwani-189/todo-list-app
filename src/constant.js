export const PREDEFINE_TASK = [
  {
    id: 1,
    task: 'Hit the gym',
    complete: false,
  },
  {
    id: 2,
    task: 'Pay bills',
    complete: true,
  },
  {
    id: 3,
    task: 'Meet George',
    complete: false,
  },
  {
    id: 4,
    task: 'Buy eggs',
    complete: false,
  },
  {
    id: 5,
    task: 'Read a books',
    complete: false,
  },
  {
    id: 6,
    task: 'Organize office',
    complete: false,
  },
]
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}
