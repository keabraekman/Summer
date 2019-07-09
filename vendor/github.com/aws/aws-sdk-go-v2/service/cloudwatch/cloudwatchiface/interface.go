// Code generated by private/model/cli/gen-api/main.go. DO NOT EDIT.

// Package cloudwatchiface provides an interface to enable mocking the Amazon CloudWatch service client
// for testing your code.
//
// It is important to note that this interface will have breaking changes
// when the service model is updated and adds new API operations, paginators,
// and waiters.
package cloudwatchiface

import (
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/cloudwatch"
)

// CloudWatchAPI provides an interface to enable mocking the
// cloudwatch.CloudWatch service client's API operation,
// paginators, and waiters. This make unit testing your code that calls out
// to the SDK's service client's calls easier.
//
// The best way to use this interface is so the SDK's service client's calls
// can be stubbed out for unit testing your code with the SDK without needing
// to inject custom request handlers into the SDK's request pipeline.
//
//    // myFunc uses an SDK service client to make a request to
//    // Amazon CloudWatch.
//    func myFunc(svc cloudwatchiface.CloudWatchAPI) bool {
//        // Make svc.DeleteAlarms request
//    }
//
//    func main() {
//        cfg, err := external.LoadDefaultAWSConfig()
//        if err != nil {
//            panic("failed to load config, " + err.Error())
//        }
//
//        svc := cloudwatch.New(cfg)
//
//        myFunc(svc)
//    }
//
// In your _test.go file:
//
//    // Define a mock struct to be used in your unit tests of myFunc.
//    type mockCloudWatchClient struct {
//        cloudwatchiface.CloudWatchAPI
//    }
//    func (m *mockCloudWatchClient) DeleteAlarms(input *cloudwatch.DeleteAlarmsInput) (*cloudwatch.DeleteAlarmsOutput, error) {
//        // mock response/functionality
//    }
//
//    func TestMyFunc(t *testing.T) {
//        // Setup Test
//        mockSvc := &mockCloudWatchClient{}
//
//        myfunc(mockSvc)
//
//        // Verify myFunc's functionality
//    }
//
// It is important to note that this interface will have breaking changes
// when the service model is updated and adds new API operations, paginators,
// and waiters. Its suggested to use the pattern above for testing, or using
// tooling to generate mocks to satisfy the interfaces.
type CloudWatchAPI interface {
	DeleteAlarmsRequest(*cloudwatch.DeleteAlarmsInput) cloudwatch.DeleteAlarmsRequest

	DeleteDashboardsRequest(*cloudwatch.DeleteDashboardsInput) cloudwatch.DeleteDashboardsRequest

	DescribeAlarmHistoryRequest(*cloudwatch.DescribeAlarmHistoryInput) cloudwatch.DescribeAlarmHistoryRequest

	DescribeAlarmsRequest(*cloudwatch.DescribeAlarmsInput) cloudwatch.DescribeAlarmsRequest

	DescribeAlarmsForMetricRequest(*cloudwatch.DescribeAlarmsForMetricInput) cloudwatch.DescribeAlarmsForMetricRequest

	DisableAlarmActionsRequest(*cloudwatch.DisableAlarmActionsInput) cloudwatch.DisableAlarmActionsRequest

	EnableAlarmActionsRequest(*cloudwatch.EnableAlarmActionsInput) cloudwatch.EnableAlarmActionsRequest

	GetDashboardRequest(*cloudwatch.GetDashboardInput) cloudwatch.GetDashboardRequest

	GetMetricDataRequest(*cloudwatch.GetMetricDataInput) cloudwatch.GetMetricDataRequest

	GetMetricStatisticsRequest(*cloudwatch.GetMetricStatisticsInput) cloudwatch.GetMetricStatisticsRequest

	ListDashboardsRequest(*cloudwatch.ListDashboardsInput) cloudwatch.ListDashboardsRequest

	ListMetricsRequest(*cloudwatch.ListMetricsInput) cloudwatch.ListMetricsRequest

	PutDashboardRequest(*cloudwatch.PutDashboardInput) cloudwatch.PutDashboardRequest

	PutMetricAlarmRequest(*cloudwatch.PutMetricAlarmInput) cloudwatch.PutMetricAlarmRequest

	PutMetricDataRequest(*cloudwatch.PutMetricDataInput) cloudwatch.PutMetricDataRequest

	SetAlarmStateRequest(*cloudwatch.SetAlarmStateInput) cloudwatch.SetAlarmStateRequest

	WaitUntilAlarmExists(*cloudwatch.DescribeAlarmsInput) error
	WaitUntilAlarmExistsWithContext(aws.Context, *cloudwatch.DescribeAlarmsInput, ...aws.WaiterOption) error
}

var _ CloudWatchAPI = (*cloudwatch.CloudWatch)(nil)
