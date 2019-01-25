import React from 'react';
import ThreadDump from '../../types/ThreadDump';
import ThreadsOverviewLegend from './ThreadsOverviewLegend';
import './ThreadsOverviewPage.css';
import ThreadsOverviewSettings from './ThreadsOverviewSettings';
import ThreadsOverviewTable from './ThreadsOverviewTable';

type ThreadsOverviewPageProps = {
  threadDumps: ThreadDump[];
};

type ThreadsOverviewPageState = {
  nameFilter: string;
  stackFilter: string;
};

export default class ThreadsOverviewPage
  extends React.PureComponent<ThreadsOverviewPageProps, ThreadsOverviewPageState> {

  public state = {
    nameFilter: '',
    stackFilter: '',
  };

  public handleNameFilterChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ nameFilter: event.target.value });
  }

  public handleStackFilterChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ stackFilter: event.target.value });
  }

  public render() {
    return (
      <div className="threads-overview-content">
        <ThreadsOverviewLegend />
        <ThreadsOverviewSettings
          nameFilter={this.state.nameFilter}
          stackFilter={this.state.stackFilter}
          onNameFilterChange={this.handleNameFilterChange}
          onStackFilterChange={this.handleStackFilterChange}
        />
        <ThreadsOverviewTable
          threadDumps={this.props.threadDumps}
          nameFilter={this.state.nameFilter}
          stackFilter={this.state.stackFilter}
        />
      </div>
    );
  }
}