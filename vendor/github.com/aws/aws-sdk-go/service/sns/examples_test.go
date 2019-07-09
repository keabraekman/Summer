// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT.

package sns_test

import (
	"bytes"
	"fmt"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/sns"
)

var _ time.Duration
var _ bytes.Buffer

func ExampleSNS_AddPermission() {
	svc := sns.New(session.New())

	params := &sns.AddPermissionInput{
		AWSAccountId: []*string{ // Required
			aws.String("delegate"), // Required
			// More values...
		},
		ActionName: []*string{ // Required
			aws.String("action"), // Required
			// More values...
		},
		Label:    aws.String("label"),    // Required
		TopicArn: aws.String("topicARN"), // Required
	}
	resp, err := svc.AddPermission(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_ConfirmSubscription() {
	svc := sns.New(session.New())

	params := &sns.ConfirmSubscriptionInput{
		Token:                     aws.String("token"),    // Required
		TopicArn:                  aws.String("topicARN"), // Required
		AuthenticateOnUnsubscribe: aws.String("authenticateOnUnsubscribe"),
	}
	resp, err := svc.ConfirmSubscription(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_CreatePlatformApplication() {
	svc := sns.New(session.New())

	params := &sns.CreatePlatformApplicationInput{
		Attributes: map[string]*string{ // Required
			"Key": aws.String("String"), // Required
			// More values...
		},
		Name:     aws.String("String"), // Required
		Platform: aws.String("String"), // Required
	}
	resp, err := svc.CreatePlatformApplication(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_CreatePlatformEndpoint() {
	svc := sns.New(session.New())

	params := &sns.CreatePlatformEndpointInput{
		PlatformApplicationArn: aws.String("String"), // Required
		Token: aws.String("String"), // Required
		Attributes: map[string]*string{
			"Key": aws.String("String"), // Required
			// More values...
		},
		CustomUserData: aws.String("String"),
	}
	resp, err := svc.CreatePlatformEndpoint(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_CreateTopic() {
	svc := sns.New(session.New())

	params := &sns.CreateTopicInput{
		Name: aws.String("topicName"), // Required
	}
	resp, err := svc.CreateTopic(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_DeleteEndpoint() {
	svc := sns.New(session.New())

	params := &sns.DeleteEndpointInput{
		EndpointArn: aws.String("String"), // Required
	}
	resp, err := svc.DeleteEndpoint(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_DeletePlatformApplication() {
	svc := sns.New(session.New())

	params := &sns.DeletePlatformApplicationInput{
		PlatformApplicationArn: aws.String("String"), // Required
	}
	resp, err := svc.DeletePlatformApplication(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_DeleteTopic() {
	svc := sns.New(session.New())

	params := &sns.DeleteTopicInput{
		TopicArn: aws.String("topicARN"), // Required
	}
	resp, err := svc.DeleteTopic(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_GetEndpointAttributes() {
	svc := sns.New(session.New())

	params := &sns.GetEndpointAttributesInput{
		EndpointArn: aws.String("String"), // Required
	}
	resp, err := svc.GetEndpointAttributes(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_GetPlatformApplicationAttributes() {
	svc := sns.New(session.New())

	params := &sns.GetPlatformApplicationAttributesInput{
		PlatformApplicationArn: aws.String("String"), // Required
	}
	resp, err := svc.GetPlatformApplicationAttributes(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_GetSubscriptionAttributes() {
	svc := sns.New(session.New())

	params := &sns.GetSubscriptionAttributesInput{
		SubscriptionArn: aws.String("subscriptionARN"), // Required
	}
	resp, err := svc.GetSubscriptionAttributes(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_GetTopicAttributes() {
	svc := sns.New(session.New())

	params := &sns.GetTopicAttributesInput{
		TopicArn: aws.String("topicARN"), // Required
	}
	resp, err := svc.GetTopicAttributes(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_ListEndpointsByPlatformApplication() {
	svc := sns.New(session.New())

	params := &sns.ListEndpointsByPlatformApplicationInput{
		PlatformApplicationArn: aws.String("String"), // Required
		NextToken:              aws.String("String"),
	}
	resp, err := svc.ListEndpointsByPlatformApplication(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_ListPlatformApplications() {
	svc := sns.New(session.New())

	params := &sns.ListPlatformApplicationsInput{
		NextToken: aws.String("String"),
	}
	resp, err := svc.ListPlatformApplications(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_ListSubscriptions() {
	svc := sns.New(session.New())

	params := &sns.ListSubscriptionsInput{
		NextToken: aws.String("nextToken"),
	}
	resp, err := svc.ListSubscriptions(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_ListSubscriptionsByTopic() {
	svc := sns.New(session.New())

	params := &sns.ListSubscriptionsByTopicInput{
		TopicArn:  aws.String("topicARN"), // Required
		NextToken: aws.String("nextToken"),
	}
	resp, err := svc.ListSubscriptionsByTopic(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_ListTopics() {
	svc := sns.New(session.New())

	params := &sns.ListTopicsInput{
		NextToken: aws.String("nextToken"),
	}
	resp, err := svc.ListTopics(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_Publish() {
	svc := sns.New(session.New())

	params := &sns.PublishInput{
		Message: aws.String("message"), // Required
		MessageAttributes: map[string]*sns.MessageAttributeValue{
			"Key": { // Required
				DataType:    aws.String("String"), // Required
				BinaryValue: []byte("PAYLOAD"),
				StringValue: aws.String("String"),
			},
			// More values...
		},
		MessageStructure: aws.String("messageStructure"),
		Subject:          aws.String("subject"),
		TargetArn:        aws.String("String"),
		TopicArn:         aws.String("topicARN"),
	}
	resp, err := svc.Publish(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_RemovePermission() {
	svc := sns.New(session.New())

	params := &sns.RemovePermissionInput{
		Label:    aws.String("label"),    // Required
		TopicArn: aws.String("topicARN"), // Required
	}
	resp, err := svc.RemovePermission(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_SetEndpointAttributes() {
	svc := sns.New(session.New())

	params := &sns.SetEndpointAttributesInput{
		Attributes: map[string]*string{ // Required
			"Key": aws.String("String"), // Required
			// More values...
		},
		EndpointArn: aws.String("String"), // Required
	}
	resp, err := svc.SetEndpointAttributes(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_SetPlatformApplicationAttributes() {
	svc := sns.New(session.New())

	params := &sns.SetPlatformApplicationAttributesInput{
		Attributes: map[string]*string{ // Required
			"Key": aws.String("String"), // Required
			// More values...
		},
		PlatformApplicationArn: aws.String("String"), // Required
	}
	resp, err := svc.SetPlatformApplicationAttributes(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_SetSubscriptionAttributes() {
	svc := sns.New(session.New())

	params := &sns.SetSubscriptionAttributesInput{
		AttributeName:   aws.String("attributeName"),   // Required
		SubscriptionArn: aws.String("subscriptionARN"), // Required
		AttributeValue:  aws.String("attributeValue"),
	}
	resp, err := svc.SetSubscriptionAttributes(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_SetTopicAttributes() {
	svc := sns.New(session.New())

	params := &sns.SetTopicAttributesInput{
		AttributeName:  aws.String("attributeName"), // Required
		TopicArn:       aws.String("topicARN"),      // Required
		AttributeValue: aws.String("attributeValue"),
	}
	resp, err := svc.SetTopicAttributes(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_Subscribe() {
	svc := sns.New(session.New())

	params := &sns.SubscribeInput{
		Protocol: aws.String("protocol"), // Required
		TopicArn: aws.String("topicARN"), // Required
		Endpoint: aws.String("endpoint"),
	}
	resp, err := svc.Subscribe(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}

func ExampleSNS_Unsubscribe() {
	svc := sns.New(session.New())

	params := &sns.UnsubscribeInput{
		SubscriptionArn: aws.String("subscriptionARN"), // Required
	}
	resp, err := svc.Unsubscribe(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return
	}

	// Pretty-print the response data.
	fmt.Println(resp)
}
