
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';

interface FetchOptions {
  table: string;
  column?: string;
  value?: string;
  order?: { column: string; ascending: boolean };
  limit?: number;
}

export function useSupabaseFetch<T>(options: FetchOptions) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Use "any" type to bypass TypeScript strict checking for dynamic table names
        // This is necessary because the table names come from user input
        const query = supabase
          .from(options.table)
          .select('*');
        
        if (options.column && options.value) {
          query.eq(options.column, options.value);
        }
        
        if (options.order) {
          query.order(options.order.column, { 
            ascending: options.order.ascending 
          });
        }
        
        if (options.limit) {
          query.limit(options.limit);
        }
        
        const { data: result, error } = await query;
        
        if (error) {
          throw new Error(error.message);
        }
        
        setData(result as T[]);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro desconhecido ao buscar dados'));
        toast.error('Erro ao carregar dados', {
          description: err instanceof Error ? err.message : 'Erro desconhecido'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [options.table, options.column, options.value, options.order?.column, options.order?.ascending, options.limit]);

  return { data, isLoading, error };
}
