import React from 'react';
import Thread from '../../types/Thread';
import StackTrace from './StackTrace';
import ThreadSummary from './ThreadSummary';

type SimilarStacksGroupProps = {
  threadGroup: Thread[];
  linesToConsider: number;
};

type SimilarStacksGroupState = {
  expanded: boolean;
};

export default class GroupDetails
  extends React.PureComponent<SimilarStacksGroupProps, SimilarStacksGroupState> {

  private static THREADS_TO_SHOW_WHEN_COLLAPSED = 20;

  public state: SimilarStacksGroupState = {
    expanded: false,
  };

  public render() {
    const stackTrace = this.getStackTrace(this.props.threadGroup);
    const sortedByName = this.props.threadGroup.sort((t1, t2) => t1.name.localeCompare(t2.name));
    const collapsable = sortedByName.length - GroupDetails.THREADS_TO_SHOW_WHEN_COLLAPSED;
    const threads = this.state.expanded
      ? sortedByName
      : sortedByName.slice(0, GroupDetails.THREADS_TO_SHOW_WHEN_COLLAPSED);

    return (
      <>
        <ul>
          {threads.map((thread, index) => <ThreadSummary key={index} thread={thread} />)}

          {collapsable > 0 &&
            <li><a onClick={this.toggleExpand}>
              {this.state.expanded
                ? `Collapse threads list (hide ${collapsable} thread(s))`
                : `Expand threads list (${collapsable} more thread(s) to show)`}
            </a></li>}
        </ul>
        <StackTrace stackTrace={stackTrace} linesToConsider={this.props.linesToConsider} />
      </>
    );
  }

  private toggleExpand = () => {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  }

  private getStackTrace = (threads: Thread[]): string[] => {
    for (const thread of threads) {
      if (thread) {
        return thread.stackTrace;
      }
    }
    return [];
  }
}