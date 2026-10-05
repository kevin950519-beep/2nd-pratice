import { TimelineProvider, TimeThemeProvider } from '../src/components/dynamic-color';
import { SyncGlobalTime } from './SyncGlobalTime';
import { TIMELINE_STOPS } from '../src/utils/timeline';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  globalTypes: {
    time: {
      description: '시간대 (전역 테마)',
      toolbar: {
        title: 'Time',
        icon: 'timealarm',
        items: TIMELINE_STOPS.map(({ time, label, name }) => ({ value: time, title: `${label} ${name}` })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { time: 0 },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    options: {
      storySort: {
        order: [
          'Overview',
          'Style',
          ['Overview', 'Colors', 'Typography', 'Icons', 'Spacing', 'Component Tokens'],
          'Component',
          [
            '1. Typography',
            '2. Container',
            '3. Card',
            '4. Media',
            '5. Data Display',
            '6. In-page Navigation',
            '7. Input & Control',
            '8. Layout',
            '9. Overlay & Feedback',
            '10. Navigation',
          ],
          'Interactive',
          ['12. Scroll'],
          'Common',
          'Template',
          'Test Data',
        ],
        method: 'alphabetical',
      },
    },
  },
  decorators: [
    (Story, { globals }) => (
      <TimelineProvider initialTime={ Number(globals.time) || 0 }>
        <SyncGlobalTime time={ Number(globals.time) || 0 }>
          <TimeThemeProvider>
            <div style={{ width: '100%', paddingTop: '40px' }}>
              <Story />
            </div>
          </TimeThemeProvider>
        </SyncGlobalTime>
      </TimelineProvider>
    ),
  ],
};

export default preview;
