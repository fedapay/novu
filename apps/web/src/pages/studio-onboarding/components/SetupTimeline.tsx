import { CodeSnippet } from '../../get-started/components/CodeSnippet';
import { Loader, Timeline as MantineTimeline } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { Input } from '@novu/design-system';
import { IconCheck, IconCancel } from '@novu/novui/icons';
import { useQuery } from '@tanstack/react-query';
import { getApiKeys } from '../../../api/environment';
import { Text } from '@novu/novui';
import { Timeline } from '../../../components/Timeline/index';
import { css } from '@novu/novui/css';

const Icon = () => (
  <IconCheck
    className={css({
      color: 'typography.text.main !important',
    })}
  />
);

export const SetupTimeline = ({
  error,
  url,
  setUrl,
  testResponse,
  retest,
}: {
  error: string;
  url: string;
  setUrl: (url: string) => void;
  testResponse: { isLoading: boolean; data: { status: string } };
  retest: () => void;
}) => {
  const { data: apiKeys = [] } = useQuery<{ key: string }[]>(['getApiKeys'], getApiKeys);
  const key = useMemo(() => apiKeys[0]?.key, [apiKeys]);
  const [active, setActive] = useState(0);

  function CheckStatusIcon() {
    return (
      <>
        {testResponse?.isLoading ? <Loader size={16} color={'indigo'} /> : null}
        {testResponse?.data?.status === 'ok' ? <IconCheck color="green" /> : null}
        {url && !testResponse?.isLoading && testResponse?.data?.status !== 'ok' ? <IconCancel color="#f45c5c" /> : null}
      </>
    );
  }

  return (
    <Timeline>
      <MantineTimeline.Item
        bullet={active >= 1 ? <Icon /> : 1}
        lineVariant="dashed"
        title="Create Novu Example App"
        active={active >= 1}
      >
        <Text variant="main" color="typography.text.secondary">
          This will create a new Next.js sample app with React-Email
        </Text>
        <CodeSnippet
          command={`npx create-novu-app --api-key=${key}`}
          onClick={() => {
            setActive((old) => (old > 1 ? old : 1));
          }}
        />
      </MantineTimeline.Item>
      <MantineTimeline.Item
        bullet={active >= 2 ? <Icon /> : 2}
        lineVariant="dashed"
        title="Start your application"
        active={active >= 2}
      >
        <CodeSnippet
          command={'cd my-novu-app && npm run dev'}
          onClick={() => {
            setActive((old) => (old > 2 ? old : 2));
          }}
        />
      </MantineTimeline.Item>
      <MantineTimeline.Item
        bullet={active >= 2 ? <Icon /> : 2}
        lineVariant="dashed"
        title="Start a localtunnel to your application"
        active={active >= 2}
      >
        <CodeSnippet
          command={'npx localtunnel --port=4000'}
          onClick={() => {
            setActive((old) => (old > 2 ? old : 2));
          }}
        />
      </MantineTimeline.Item>
      <MantineTimeline.Item
        bullet={active >= 3 ? <Icon /> : 3}
        lineVariant="dashed"
        title="Connect to the endpoint"
        active={active >= 3}
      >
        <Text variant="main" color="typography.text.secondary">
          Enter the Novu Endpoint URL generated by the CLI.
        </Text>
        <Input
          rightSection={<CheckStatusIcon />}
          type="url"
          placeholder={'For Example: https://cold-dryers-leave.loca.lt/api/novu'}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          value={url}
          error={
            (url && error) || (url && !testResponse.isLoading && testResponse.data?.status !== 'ok') ? (
              <>
                Could not locate a valid Novu Endpoint.{' '}
                <a style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => retest()}>
                  Try Again
                </a>
              </>
            ) : null
          }
        />
      </MantineTimeline.Item>
    </Timeline>
  );
};
