import { supabase } from '../lib/supabase';
import { Inquiry } from '../types';

export const submitInquiry = async (inquiry: Inquiry): Promise<void> => {
  try {
    const { error } = await supabase
      .from('inquiry_submissions')
      .insert([
        {
          name: inquiry.name,
          email: inquiry.email,
          subject: inquiry.subject,
          message: inquiry.message
        }
      ]);

    if (error) throw error;
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    throw error;
  }
};
