import { PipelineType, ProgressCallback } from '@huggingface/transformers';

export default class MyClassificationPipeline {
    static task: PipelineType = 'text-classification';
    static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
    static instance: Promise<any> | null = null;
  
    static async getInstance(progress_callback?: ProgressCallback): Promise<any> {
      if (this.instance === null) {
        // Dynamically import the Transformers.js library
        let { pipeline, env } = await import('@huggingface/transformers');
  
        // NOTE: Uncomment this to change the cache directory
        // env.cacheDir = './.cache';
  
        this.instance = pipeline(this.task, this.model, { progress_callback , dtype : "fp16" });
      }
  
      return this.instance;
    }
}