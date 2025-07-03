import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';

export default function Home() {
  return (
    <div className='p-4'>
      <div className='flex flex-col gap-y-4'>
        <p className='text-rose-600'>HELLO</p>
        <div>
          <Button>I am a button</Button>
        </div>
        <div>
          <Input placeholder='I am a input' />
        </div>
        <div>
          <Progress value={50} />
        </div>
        <div>
          <Textarea value='I am a textarea' />
        </div>
      </div>
    </div>
  );
}
