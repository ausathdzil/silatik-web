'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DownloadIcon,
  EditIcon,
  MinusIcon,
  PlusIcon,
  SaveIcon,
  ShareIcon,
} from 'lucide-react';
import { useState } from 'react';

type PlanSection = 'objective' | 'timeline';
type ListSection = 'targetedInterventions' | 'resources' | 'monitoring';

interface ActionPlan {
  objective: string;
  targetedInterventions: string[];
  timeline: string;
  resources: string[];
  monitoring: string[];
}

function ActionButton({
  type,
  onClick,
}: {
  type: 'add' | 'remove';
  onClick: () => void;
}) {
  return (
    <Button
      variant={type === 'add' ? 'outline' : 'destructive'}
      size="icon"
      onClick={onClick}
    >
      {type === 'add' ? <PlusIcon /> : <MinusIcon />}
    </Button>
  );
}

export function ActionPlan({ initialPlan }: { initialPlan: ActionPlan }) {
  const [plan, setPlan] = useState<ActionPlan>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('actionPlan');
      if (saved) return JSON.parse(saved);
    }
    return initialPlan;
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (section: PlanSection, value: string) => {
    setPlan((prev) => ({ ...prev, [section]: value }));
  };

  const handleListChange = (
    section: ListSection,
    index: number,
    value: string
  ) => {
    setPlan((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addListItem = (section: ListSection) => {
    setPlan((prev) => ({
      ...prev,
      [section]: [...prev[section], ''],
    }));
  };

  const removeListItem = (section: ListSection, index: number) => {
    setPlan((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    localStorage.setItem('actionPlan', JSON.stringify(plan));
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <>
        <ol className="list-decimal list-inside space-y-6">
          <li>
            <span className="font-medium">Objective:</span>{' '}
            <span>{plan.objective}</span>
          </li>

          <li>
            <span className="font-medium">Targeted Intervention:</span>
            <ul className="list-disc list-inside ml-4">
              {plan.targetedInterventions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </li>

          <li>
            <span className="font-medium">Schedule / Timeline:</span>{' '}
            <span>{plan.timeline}</span>
          </li>

          <li>
            <span className="font-medium">Resources Needed:</span>
            <ul className="list-disc list-inside ml-4">
              {plan.resources.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </li>

          <li>
            <span className="font-medium">Monitoring and Evaluation:</span>
            <ul className="list-disc list-inside ml-4">
              {plan.monitoring.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </li>
        </ol>

        <div className="flex gap-4 my-6">
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <EditIcon />
            Edit Plan
          </Button>
          <Button>
            <DownloadIcon />
            Download PDF
          </Button>
          <Button>
            <ShareIcon />
            Share
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <ol className="list-decimal list-inside space-y-6">
        <li className="space-y-2">
          <span className="font-medium">Objective:</span>
          <Input
            value={plan.objective}
            onChange={(e) => handleInputChange('objective', e.target.value)}
          />
        </li>

        <li className="space-y-2">
          <span className="font-medium">Targeted Intervention:</span>
          <ul className="space-y-2">
            {plan.targetedInterventions.map((item, index) => (
              <li key={index} className="flex gap-2 items-center">
                <Input
                  value={item}
                  onChange={(e) =>
                    handleListChange(
                      'targetedInterventions',
                      index,
                      e.target.value
                    )
                  }
                />
                <ActionButton
                  type="remove"
                  onClick={() => removeListItem('targetedInterventions', index)}
                />
              </li>
            ))}
          </ul>
          <ActionButton
            type="add"
            onClick={() => addListItem('targetedInterventions')}
          />
        </li>

        <li className="space-y-2">
          <span className="font-medium">Schedule / Timeline:</span>
          <Input
            value={plan.timeline}
            onChange={(e) => handleInputChange('timeline', e.target.value)}
          />
        </li>

        <li className="space-y-2">
          <span className="font-medium">Resources Needed:</span>
          <ul className="space-y-2">
            {plan.resources.map((item, index) => (
              <li key={index} className="flex gap-2 items-center">
                <Input
                  value={item}
                  onChange={(e) =>
                    handleListChange('resources', index, e.target.value)
                  }
                />
                <ActionButton
                  type="remove"
                  onClick={() => removeListItem('resources', index)}
                />
              </li>
            ))}
          </ul>
          <ActionButton type="add" onClick={() => addListItem('resources')} />
        </li>

        <li className="space-y-2">
          <span className="font-medium">Monitoring and Evaluation:</span>
          <ul className="space-y-2">
            {plan.monitoring.map((item, index) => (
              <li key={index} className="flex gap-2 items-center">
                <Input
                  value={item}
                  onChange={(e) =>
                    handleListChange('monitoring', index, e.target.value)
                  }
                />
                <ActionButton
                  type="remove"
                  onClick={() => removeListItem('monitoring', index)}
                />
              </li>
            ))}
          </ul>
          <ActionButton type="add" onClick={() => addListItem('monitoring')} />
        </li>
      </ol>

      <div className="flex gap-2 my-6">
        <Button onClick={handleSave}>
          <SaveIcon />
          Save Plan
        </Button>
      </div>
    </>
  );
}
