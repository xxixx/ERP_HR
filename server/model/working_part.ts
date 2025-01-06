import { sql } from '~~/server/db';

export type WORKING_PART_Model =  {
  NO: number;
  ASSY_PART_NAME: string;
  ASSY_SUB_PART_NAME: string;
  C_PUMBUN: string;
  F_PUMBUN: string;
  JAEDAN_PART_NAME: string;
  WONDAN_NAME: string;
  REG_STATE: string;
};

export const getWORKING_PART = async () => {
  const result = await sql({
    // query: 'SELECT * FROM WORKING_PART'
    query: 'SELECT * FROM WorkingPartProductsWondanViewTable'
  });

  return result as WORKING_PART_Model[];
};
export const getWORKING_PART_JAEDAN = async () => {
  const result = await sql({
    // query: 'SELECT * FROM WORKING_PART'
    query: 'SELECT * FROM WorkingPartProductsWondanViewTable'
  });

  return result as WORKING_PART_Model[];
};