import OpenAI from "openai";
import { OPENAI_API_KEY } from "@/lib/env";

export const openai = OPENAI_API_KEY
  ? new OpenAI({ apiKey: OPENAI_API_KEY })
  : null;
