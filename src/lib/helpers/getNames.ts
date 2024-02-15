import { type Identifier } from 'estree';

function getNames(identifiers: Identifier[]) {
  return identifiers.map((identifier) => identifier.name);
}

export default getNames;
